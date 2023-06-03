import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { WaitlistEmail } from "@prisma/client";

export async function POST(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")
  const re = /\S+@\S+\.\S+/
    if (email && re.test(email)) {
      const allWaitlistEmails: WaitlistEmail[] = await prisma.waitlistEmail.findMany()
      for (const waitlistEntry of allWaitlistEmails) {
        if (waitlistEntry.email == email) {
          return NextResponse.json({error: "Already on waitlist"}, {status: 400})
        }
      }
      const newWaitlistEmail = await prisma.waitlistEmail.create({
        data: {
          email: email
        }
      })
      return NextResponse.json({newWaitlistEmail})
    } else {
      return NextResponse.json({error: "Invalid Request Format"}, {status: 400})
    }
}