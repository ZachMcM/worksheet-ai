'use client'

import { useState } from "react"
import { TbArrowRight, TbStar, TbStarFilled } from "react-icons/tb"
import Loading from "./Loading"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postFeedback } from "../api-calls"

const NewFeedback = () => {
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [numStars, setNumStars] = useState<number>(0)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbackEntries'] })
    }
  })

  return (
    <div className="p-6 flex flex-col space-y-5 md:w-1/2">
      <p className="font-medium text-2xl text-start">Write your own feedback</p>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setNumStars(1)}
          className="hover:opacity-80 duration-300 text-xl"
        >
          {
            numStars >= 1 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
        </button>
        <button
          onClick={() => setNumStars(2)}
          className="hover:opacity-80 duration-300 text-xl"
        >
          {
            numStars >= 2 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
        </button>
        <button
          onClick={() => setNumStars(3)}
          className="hover:opacity-80 duration-300 text-xl"
        >
          {
            numStars >= 3 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
        </button>
        <button
          onClick={() => setNumStars(4)}
          className="hover:opacity-80 duration-300 text-xl"
        >
          {
            numStars >= 4 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
        </button>
        <button
          onClick={() => setNumStars(5)}
          className="hover:opacity-80 duration-300 text-xl"
        >
          {
            numStars >= 5 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
        </button>
      </div>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="placeholder:text-neutral-500 p-3 border border-neutral-500 focus:border-white bg-transparent rounded-md"
        />
      <textarea 
        placeholder="Enter your content"
        className="p-3 placeholder:text-neutral-500 border border-neutral-500 text-netural-500 focus:border-white bg-transparent rounded-md"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded-md bg-white text-black flex items-center space-x-2 w-fit hover:opacity-80 duration-300"
        onClick={() => {
          if (content && numStars && title) {
            setContent('')
            setTitle('')
            setNumStars(0)
            mutation.mutate({
              content: content,
              title: title,
              numStars: numStars
            })
          }
        }}
      >
        <p className="font-medium">Submit</p>
        <TbArrowRight className="text-xl"/>
      </button>
    </div>
  )
}

export default NewFeedback