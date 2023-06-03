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
      const subject = request.nextUrl.searchParams.get("subject")
      const topic = request.nextUrl.searchParams.get("topic")
      const title = request.nextUrl.searchParams.get("title")
      const num = request.nextUrl.searchParams.get("num")
    
      const queries = `?secret=${secret}&subject=${subject}&topic=${topic}&title=${title}&num=${num}`
      const res = await fetch(`https://worksheet-ai-api-production.up.railway.app/worksheet${queries}`)
      const data = await res.json()
      const pdfLink = data.urlToPdf
      const stringData = data.data
    
      if (subject && topic && title && num && pdfLink && stringData) {
        const newWorksheet = await prisma.worksheet.create({
          data: {
            title: title,
            subject: subject,
            topic: topic,
            userId: user.id,
            pdfLink: pdfLink,
            stringData: stringData
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


