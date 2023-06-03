import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { Worksheet } from "@prisma/client";
import { use } from "react";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session && session.user && session.user.email) {
    const worksheetId = request.nextUrl.searchParams.get("worksheetId")

    if (worksheetId) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        }
      })

      if (user && user.id) {
        const worksheet = await prisma.worksheet.findUnique({
          where: {
            id: worksheetId
          }
        })

        if (worksheet?.userId != user.id) {
          return NextResponse.json({error: "Unauthenticated Request"}, {status: 400})
        } else {
          return NextResponse.json({worksheet})
        }
      }
    }
  } else {
    return NextResponse.json({error: "Unauthenticated Request"}, {status: 400})
  }
}