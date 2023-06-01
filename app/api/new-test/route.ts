import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { McTest } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session) {
    const tests = await prisma.mcTest.findMany({
      where: {
        user: {
          is: {
            email: session.user?.email
          }
        }
      }
    })
    return NextResponse.json({ tests })
  } else {
    return NextResponse.json("No valid session")
  }
}


export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const prompt = request.nextUrl.searchParams.get("subject") + " " + request.nextUrl.searchParams.get("topic")
  const num = request.nextUrl.searchParams.get("num")

  if (session) {
    const res = await fetch(`https://study-ai-api-production.up.railway.app/mc?secret=${process.env.API_SECRET}&prompt=${prompt}&num=${num}`)
    const data = await res.json()
    console.log(data)
    return NextResponse.json(data)
  } else {
    return NextResponse.json("No valid session")
  }
}


