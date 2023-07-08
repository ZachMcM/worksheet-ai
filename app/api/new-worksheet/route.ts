import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { decode } from "base64-arraybuffer"; 


import { Configuration, OpenAIApi } from "openai";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { uid } from "uid";
import { supabase } from "@/lib/supabaseClient";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const systemMessage = "You are a worksheet creation AI. Create worksheets that are somewhat difficult and adhere to the prompt."

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email}
    })

    if (user) {
      const body = await request.json()
      const { subject, topic, title, num }: { subject: string, topic: string, title: string, num: number} = body

      const completion = await openai.createChatCompletion({
        temperature: 1,
        model: "gpt-4",
        messages: [{"role": "system", "content": systemMessage}, {role: "user", content: `Create a(n) ${subject} ${topic} worksheet with ${num} questions. Do not put the answers below the question and only list the correct answers at the bottom headed with "answers" and add space after each question.`}],
      });
      const res = completion.data.choices[0].message?.content
      console.log(res)

      if (res) {
        const resArr = res.split("Answers")

        const docDef: TDocumentDefinitions = {
          content: [
            "\n",
            { text: title, style: 'header'},
            "\n",
            resArr[0],
            { text: resArr[1], pageBreak: 'before'},
          ],
  
          styles: {
            header: {
              fontSize: 22,
              bold: true
            }
          }
        }

        const pathToFile = `worksheets/${uid()}`
        const pdfGenerator = pdfMake.createPdf(docDef)
        pdfGenerator.getBase64(async (base64) => {
          const { data, error } = await supabase.storage.from('pdfs').upload(pathToFile, decode(base64), 
          {
            contentType: 'application/pdf'
          })
          if (error) {
            console.log(error)
          } else {
            console.log(data)
          }
        })

        const { data } = supabase.storage.from("pdfs").getPublicUrl(pathToFile)

        const newWorksheet = await prisma.worksheet.create({
          data: {
            title: title,
            subject: subject,
            topic: topic,
            userId: user.id,
            pdfLink: data.publicUrl,
            stringData: res,
            updatedAt: new Date(),
            pathToFile: pathToFile
          }
        })
        return NextResponse.json({newWorksheet})

      } else {
        return NextResponse.json({ error: "AI Generation error", status: 500 })
      }
      
    } else {
      return NextResponse.json({error: "Error unauthenticated request"}, {status: 400})
    }
  } else {
    return NextResponse.json({error: "Error unauthenticated request"}, {status: 400})
  }
}




