import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session && session.user && session.user.email) {
    const worksheetId = request.nextUrl.searchParams.get("worksheetId")
    const newTitle = request.nextUrl.searchParams.get("newTitle")

    if (worksheetId && newTitle) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      })
      
      if (user && user.id) {
        const worksheet = await prisma.worksheet.findUnique({
          where: {
            id: worksheetId
          }
        })

        if (worksheet?.userId == user.id) {
          const updatedWorksheet = await prisma.worksheet.update({
            where: {
              id: worksheetId
            },
            data: {
              title: newTitle,
              updatedAt: new Date()
            }
          })
          return NextResponse.json({ updatedWorksheet })
        } else {
          return NextResponse.json({error: "Unaunthenticated Request"}, {status: 400})
        }
      }
    } else {
      return NextResponse.json({error: "Missing Id"}, {status: 400})
    }
  } else {
    return NextResponse.json({error: "Unauthorized Request"}, {status: 400})
  }
}