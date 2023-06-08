import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // @ts-expect-error
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-expect-error
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }