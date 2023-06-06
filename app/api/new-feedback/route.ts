import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import Filter from "bad-words"
const filter = new Filter()

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session && session.user && session.user.email) {
    const body = await request.json()
    if (!filter.isProfane(body.content) && !filter.isProfane(body.title)) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      })
      if (user && user.id) {
        const newFeedback = await prisma.feedback.create({
          data: {
            userId: user?.id,
            content: body.content,
            title: body.title,
            numStars: body.numStars
          }
        })
        console.log("Successful feedback creation")
        return NextResponse.json({newFeedback})
      } else {
        return NextResponse.json({ error: "No user found for this session" }, { status: 400 })
      }
    } else {
      return NextResponse.json({ error: "Innapropriate message"}, { status: 400 })
    }
  }
}