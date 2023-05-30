'use client'

import Link from "next/link"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { FiPlus } from "react-icons/fi"

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/dashboard')
    },
  })

  return (
    <main className="h-screen w-screen">
      <nav className="sticky top-0 w-full">
        <h1></h1>
      </nav>
      {/* <Link href="/new-speech" className="text-xl px-4 py-3 bg-teal-500 rounded-md font-medium text-white flex space-x-2 items-center">
        <p>New Speech</p>
        <FiPlus className="text-4x;"/>
      </Link> */}
    </main>
  )
}

export default Dashboard