'use client'

import Link from "next/link"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="w-full flex justify-between p-8 px-10 sticky top-0 left-0">
      <h1 className="text-2xl font-bold">better<span className="text-teal-500">speech</span></h1>
      {
        session && session.user && session.user.image ? 
        <div className="flex space-x-8 items-center">
          <button 
            className="bg-teal-500 px-4 py-2 font-medium rounded-md text-white hover:bg-opacity-80 duration-300"
            onClick={() => signOut()}
          >
            <p>Sign out</p>
          </button>
          <div className="flex space-x-5 items-center">
            <Link href="/dashboard" className="font-medium">Dashboard</Link>
            <Image
              src={session.user.image}
              height={35}
              width={35}
              alt="user image"
              className="rounded-full shadow-2xl bg-white"
            /> 
          </div>
        </div> :
        <Link 
          href='/signin?callbackUrl=/dashboard'
          className="bg-teal-500 px-4 py-2 font-medium rounded-md text-white hover:bg-opacity-80 duration-300"
        >
          <p>Sign In</p>
        </Link>
      }
    </nav>
  )
}