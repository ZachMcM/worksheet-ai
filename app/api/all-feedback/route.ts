import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Feedback } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session) {
    const feedbackEntries: Feedback[] = await prisma.feedback.findMany({
      take: 10
    })
    return NextResponse.json({feedbackEntries})
  } else {
    return NextResponse.json({ error: "Unauthorized request"}, { status: 400 })
  }
}