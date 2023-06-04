import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session && session.user && session.user.email) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        }
      })

      if (user && user.id) {
        const worksheets = await prisma.worksheet.findMany({
          where: {
            userId: user.id
          }
        })

        return NextResponse.json({worksheets})
      }
  } else {
    return NextResponse.json({error: "Unauthenticated Request"}, {status: 400})
  }
}