'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { HiOutlineX } from "react-icons/hi"

export const MobileMenu = ({setMobileMenu} : any) => {
  const { data: session } = useSession()

  return (
    <nav className="w-full flex flex-col fixed top-0 bottom-0 left-0 z-50 right-0 bg-black py-5 px-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-5 items-center text-lg md:text-2xl">
            <h1 className="font-bold">worksheet<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">ai</span></h1>
            {
              session && session.user && session.user.image &&
              <>
                <p className="text-4xl text-neutral-500 font-thin">/</p>
                <Image
                      src={session?.user?.image}
                      height={35}
                      width={35}
                      alt="user image"
                      className="rounded-full shadow-2xl bg-white"
                /> 
              </>
            }
          </div>
          <button
          onClick={() => setMobileMenu(false)}
          >
            <HiOutlineX className="text-3xl hover:opacity-80"/>
          </button>
      </div>
      <div className="flex flex-col space-y-8 mt-14">
        {
          session && session.user && session.user.image && session.user.email &&
          <div className="flex items-center justify-between pb-5 border-b border-neutral-500 text-neutral-600 text-sm">
            <p>{session.user.email}</p>
            <Image
              src={session.user.image}
              height={30}
              width={30}
              alt="profile picture"
              className="rounded-full"
            />
          </div>
        }
        <Link href="/user/dashboard" className="hover:opacity-80 flex items-center justify-between pb-5 border-b border-neutral-500 text-neutral-500">Dashboard</Link>
        {
          session && session.user ?
          <button 
            className="hover:opacity-80 flex items-center justify-between pb-5 border-b border-neutral-500 text-neutral-500"
            onClick={() => signOut()}
          >
            <p>Sign Out</p>
          </button> : 
          <Link 
            href='/signin?callbackUrl=/user/dashboard'
            className="hover:opacity-80 flex items-center justify-between pb-5 border-b border-neutral-500 text-neutral-500"
          >
            <p>Sign In</p>
          </Link>
        }
        <Link href="/about" className="hover:opacity-80 flex items-center justify-between pb-5 border-b border-neutral-500 text-neutral-500">About</Link>
      </div>
    </nav>
  )
}

export default MobileMenu