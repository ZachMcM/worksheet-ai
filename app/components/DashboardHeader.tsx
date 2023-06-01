'use client'

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import Image from "next/image"
import MobileMenu from "./MobileMenu"
import { useState } from "react"
import { HiOutlineMenuAlt4 } from "react-icons/hi"

const DashboardHeader = () => {
  const { data: session } = useSession()

  const [mobileMenu, setMobileMenu] = useState<boolean>(false)

  return (
    <>
      <nav className="w-full flex justify-between py-5 px-6 md:p-8 md:px-10 sticky top-0 left-0 z-50 bg-black border-b border-neutral-500">
        <div className="flex space-x-5 items-center text-lg md:text-2xl">
          <h1 className="font-bold">study<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">ai</span></h1>
          <p className="text-4xl text-neutral-500 font-thin">/</p>
          {
            session && session.user && session.user.image &&
            <Image
              src={session?.user?.image}
              height={35}
              width={35}
              alt="user image"
              className="rounded-full shadow-2xl bg-white"
            /> 
          }
        </div>
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              className="bg-white text-black px-4 py-2 font-medium rounded-md hover:bg-opacity-80 duration-300"
              onClick={() => signOut()}
            >
              <p>Sign Out</p>
            </button>
            <Link href="/feedback" className="border hover:opacity-80 border-neutral-500 text-neutral-500 px-4 py-2 font-medium rounded-md hover:bg-opacity-80 duration-300">Feedback</Link>
          </div>
          <button
            onClick={() => setMobileMenu(true)}
            className="md:hidden"
          >
            <HiOutlineMenuAlt4 className="text-3xl hover:opacity-80"/>
          </button>
      </nav>
      {mobileMenu && <MobileMenu setMobileMenu={setMobileMenu}/>}
    </>
  )
}

export default DashboardHeader