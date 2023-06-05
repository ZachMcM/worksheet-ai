import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { supabase } from "@/lib/supabaseClient";

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (session && session.user && session.user.email) {
    const worksheetId = request.nextUrl.searchParams.get("worksheetId")

    if (worksheetId) {
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
          const deletedWorksheet = await prisma.worksheet.delete({
            where: {
              id: worksheetId
            }
          })
          const { data, error } = await supabase.storage.from("pdfs").remove([`${deletedWorksheet.pathToFile}`])
          if (error) {
            console.log(error)
          } else {
            console.log(data)
          }
          return NextResponse.json({ deletedWorksheet })
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