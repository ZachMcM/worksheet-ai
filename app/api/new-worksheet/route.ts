import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email}
    })

    if (user) {
      const secret = process.env.API_SECRET
      const body = await request.json()
      const { subject, topic, title, num }: { subject: string, topic: string, title: string, num: number} = body
      const res = await fetch(`https://worksheetai-api.onrender.com/worksheet?secret=${secret}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const resData = await res.json()
      console.log(resData)
      const { urlToPdf, data, pathToFile }: { urlToPdf: string, data: string, pathToFile: string } = resData 
    
      if (subject && topic && title && num && urlToPdf && data) {
        const newWorksheet = await prisma.worksheet.create({
          data: {
            title: title,
            subject: subject,
            topic: topic,
            userId: user.id,
            pdfLink: urlToPdf,
            stringData: data,
            updatedAt: new Date(),
            pathToFile: pathToFile
          }
        })
        return NextResponse.json({newWorksheet})
      } else {
        return NextResponse.json({error: "Bad Request"}, {status: 400})
      }
      
    } else {
      return NextResponse.json({error: "Error unauthenticated request"}, {status: 400})
    }
  } else {
    return NextResponse.json({error: "Error unauthenticated request"}, {status: 400})
  }

}


