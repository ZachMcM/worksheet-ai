import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Feedback } from "@prisma/client";

export async function GET(request: NextRequest) {
  if (process.env.SERVER_API_SECRET == request.nextUrl.searchParams.get("secret")) {
    const feedbackEntries: Feedback[] = await prisma.feedback.findMany({
      take: 10
    })
    return NextResponse.json({feedbackEntries})
  } else {
    return NextResponse.json({ error: "Unauthorized request"}, { status: 400 })
  }
}