'use client'

import { useState } from "react"

import {TbArrowLeft, TbBellSchool, TbChevronRight, TbHeading, TbInfoCircle, TbNumbers, TbPencil } from "react-icons/tb"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Router from "next/router"
import Loading from "@/app/components/Loading"
import { Worksheet } from "@prisma/client"

const New = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/signin?callbackUrl=/user/dashboard')
    },
  })
  const [title, setTitle] = useState<string>('') 
  const [subject, setSubject] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [num, setNum] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(false)
  const [worksheetCreated, setWorksheetCreated] = useState<boolean>(false)
  const [worksheet, setWorksheet] = useState<Worksheet>()

  const createWorksheet = async () => {
    if (subject && topic && title) {
      setSubject('')
      setTopic('')
      console.log(num)
      console.log("Worksheet Created")
      setLoading(true)
      const queries = `?subject=${subject}&topic=${topic}&title=${title}&num=${num}`
      const res = await fetch(`https://worksheetai.app/api/new-worksheet${queries}`, {
        method: "POST"
      })
      if (res.status == 400) {
        Router.reload()
        console.log(res.json())
        return
      }
      const data = await res.json()
      console.log(data)
      setWorksheet(data.newWorksheet)
      setLoading(false)
      setWorksheetCreated(true)
    } else {
      console.log("Enter valid inputs")
    }
  }

  return (
    !worksheetCreated ?
    <section className="w-full">
      <div className="py-8 md:py-14 justify-center flex space-y-10">
        <div className="flex-col flex space-y-7 p-10 lg:w-1/2">
          <h1 className="font-bold text-5xl">Create a new worksheet</h1>
          <div className="flex flex-col space-y-7">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium text-xl">Title</h3>
                <div className="flex space-x-1.5 items-center p-3.5 rounded-md border border-neutral-500 focus-within:border-white duration-300">
                  <TbHeading className="text-xl text-neutral-500"/>
                  <input 
                    placeholder="Factoring Worksheet 1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-transparent outline-none border-none placeholder:text-neutral-500 w-full"
                  />
                </div>  
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium text-xl">Subject</h3>
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
                    max={30}
                    value={num}
                    onChange={(e) => setNum(parseInt(e.target.value))}
                    className="bg-transparent outline-none border-none placeholder:text-neutral-500 w-full"
                  />
                </div>  
              </div>
            </div>
            <button 
              className="p-2.5 rounded-md text-black hover:opacity-80 duration-300 bg-white flex space-x-1.5 items-center font-medium w-fit"
              onClick={createWorksheet}
            >
              <p>Submit</p>
              <TbChevronRight className="text-xl"/>
            </button> 
          </div>
        </div>
      </div>
      {
        loading && <Loading/>
      }
    </section> :
    redirect(`/user/worksheet/${worksheet?.id}`)
  )
}

export default New