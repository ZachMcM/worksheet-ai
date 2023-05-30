'use client'

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

const signin = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <button 
        className="px-10 py-4 rounded-md shadow-2xl border flex space-x-5 items-center hover:bg-neutral-100 duration-300"
        onClick={() => signIn('google', { callbackUrl })}
      >
        <FcGoogle className="text-3xl"/>
        <p className="font-semibold text-xl">Continue with Google</p>
      </button>
    </main>
  )
}

export default signin