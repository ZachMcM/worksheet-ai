'use client'

import { Dispatch, SetStateAction, useState } from "react"
import { TbBellSchool, TbChevronRight, TbFilePlus, TbHeading, TbNumbers, TbPencil, TbX } from "react-icons/tb"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Loading from "@/app/components/Loading"
import { useDetectClickOutside } from "react-detect-click-outside"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postWorksheet } from "../api-calls"

const NewWorkSheetModal = ({ setNewWorksheetModal }: { setNewWorksheetModal: Dispatch<SetStateAction<boolean>>}) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/dashboard')
    },
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: postWorksheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worksheets'] })
    }
  })

  const closeModal = () => {
    setNewWorksheetModal(false)
  }

  const ref = useDetectClickOutside({ onTriggered: closeModal})

  const [title, setTitle] = useState<string>('') 
  const [subject, setSubject] = useState<string>('')
  const [topic, setTopic] = useState<string>('')
  const [num, setNum] = useState<number>(10)

  return (
    <div className="w-full fixed top-0 bottom-0 left-0 bg-black/95 z-50 flex justify-center items-center p-6">
      <div ref={ref} className="relative flex-col flex space-y-7 p-6 md:p-10 lg:w-1/2 2xl:w-1/4 bg-black border border-neutral-500 rounded-md">
        <div className="flex space-x-2 items-center">
          <TbFilePlus className="text-4xl"/>
          <h1 className="font-bold text-2xl md:text-4xl">Create a new worksheet</h1>
        </div>
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
              <div className="flex space-x-1.5 p-3.5 items-center rounded-md border border-neutral-500 focus-within:border-white duration-300">
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
              <div className="flex space-x-5 items-center p-3.5">
                <TbNumbers className="text-xl text-neutral-500"/>
                <input 
                    min={1}
                    max={25}
                    type="range" 
                    value={num}
                    onChange={(e) => setNum(parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-neutral-500 accent-neutral-600"
                />
                <p className="font-semibold text-lg">{num}</p>
              </div>  
            </div>
          </div>
          <div className="flex space-x-5 items-center">
            <button 
              className="p-2.5 rounded-md text-black hover:opacity-80 duration-300 bg-white flex space-x-1.5 items-center font-medium w-fit"
              onClick={() => {
                if (subject && topic && title) {
                  setSubject('')
                  setTopic('')
                  setNum(10)
                  mutation.mutate({
                    subject: subject,
                    title: title,
                    topic: topic,
                    num: num
                  })
                }
              }}
            >
              <p>Submit</p>
              <TbChevronRight className="text-xl"/>
            </button> 
            <button 
              className="p-2.5 rounded-md hover:opacity-80 duration-300 bg-black text-neutral-500 border border-neutral-500 flex space-x-1.5 items-center font-medium w-fit"
              onClick={() => setNewWorksheetModal(false)}
            >
              <p>Cancel</p>
              <TbX className="text-xl"/>
            </button> 
          </div>
        </div>
      </div>
      { mutation.isLoading && <Loading/> }
      { mutation.isSuccess && redirect(`/worksheet/${mutation.data.id}`)}
    </div>
    
  )
}

export default NewWorkSheetModal