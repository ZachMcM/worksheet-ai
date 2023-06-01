'use client'

import { useState } from "react"

import {TbArrowLeft, TbBellSchool, TbChevronRight, TbInfoCircle, TbNumbers, TbPencil } from "react-icons/tb"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Image from "next/image"
import Loading from "@/app/components/Loading"

const New = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/signin?callbackUrl=/user/dashboard')
    },
  })

  const [subject, setSubject] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [num, setNum] = useState<number>(3)
  const [loading, setLoading] = useState<boolean>(false)

  const createTest = async () => {
    if (subject && topic) {
      console.log(num)
      console.log("Test Created")
      setLoading(true)
      console.time()
      const res = await fetch(`http://localhost:3000/api/new-test?subject=${subject}&topic=${topic}`, {
        method: "POST"
      })
      const data = await res.json()
      console.log(data)
      console.timeEnd()
      setLoading(false)
    } else {
      console.log("Enter valid inputs")
    }
  }

  return (
    <section className="w-full">
      <div className="py-8 md:py-14 justify-center flex space-y-10">
        <div className="flex-col flex space-y-7 p-10 lg:w-1/2">
          <h1 className="font-bold text-5xl">Create a new test</h1>
          <div className="flex flex-col space-y-7">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium text-xl">Subject/Class</h3>
                <div className="flex items-center space-x-1.5 p-3.5 rounded-md border border-neutral-500 focus-within:border-white duration-300">
                  <TbBellSchool className="text-xl text-neutral-500"/>
                  <input 
                    type="text" 
                    value={subject}
                    placeholder="eg., Calculus AB, Literature, Computer Science, etc."
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-transparent outline-none border-none placeholder:text-neutral-500 w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium text-xl">Topic </h3>
                <div className="flex space-x-1.5 p-3.5 rounded-md border border-neutral-500 focus-within:border-white duration-300">
                  <TbPencil className="text-xl text-neutral-500"/>
                  <input 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="eg., object oriented programming, literary terms, integration, etc."
                    className="bg-transparent outline-none border-none placeholder:text-neutral-500 w-full"
                  />
                </div>  
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium text-xl">Number of Questions</h3>
                <div className="flex space-x-1.5 p-3.5 rounded-md border border-neutral-500 focus-within:border-white duration-300">
                  <TbNumbers className="text-xl text-neutral-500"/>
                  <input 
                    type="number"
                    value={num}
                    min={3}
                    max={10}
                    onChange={(e) => setNum(parseInt(e.target.value) || 3)}
                    className="bg-transparent outline-none border-none placeholder:text-neutral-500 w-full"
                  />
                </div>  
              </div>
            </div>
            <button 
              className="p-2.5 rounded-md text-black hover:opacity-80 duration-300 bg-white flex space-x-1.5 items-center font-medium w-fit"
              onClick={createTest}
            >
              <p>Submit</p>
              <TbChevronRight className="text-xl"/>
            </button> 
            <div className="flex flex-col space-y-3">
              <div className="bg-red-50 rounded-md p-3.5 text-red-800 flex items-center space-x-1.5">
                <TbInfoCircle className="text-xl"/>
                <p><span className="font-medium">Danger Alert!</span> The AI might error with mathematics</p>
              </div>
              <div className="bg-yellow-50 rounded-md p-3.5 text-yellow-800 flex items-center space-x-1.5">
                <TbInfoCircle className="text-xl"/>
                <p><span className="font-medium">Warning Alert!</span> Make sure the specify your topic and subject completely</p>
              </div>
              <div className="bg-blue-50 rounded-md p-3.5 text-blue-800 flex items-center space-x-1.5">
                <TbInfoCircle className="text-xl"/>
                <p><span className="font-medium">Info Alert!</span> The more questions the slower the generation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        loading && <Loading/>
      }
    </section>
  )
}

export default New