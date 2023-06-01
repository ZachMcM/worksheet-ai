import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"

export async function POST(request: NextRequest) {

}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session) {
    const speeches = await prisma.speech.findMany({
      where: {
        user: {
          is: {
            email: session.user?.email
          }
        }
      }
    })
    return NextResponse.json({ speeches })
  } else {
    return NextResponse.json("No valid session")
  }
}



