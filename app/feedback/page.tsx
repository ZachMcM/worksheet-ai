'use client'

import { Feedback } from "@prisma/client"
import FeedbackCard from "../components/FeedbackCard"
import NewFeedback from "../components/NewFeedback"
import { useQuery } from "@tanstack/react-query"
import { getAllFeedback } from "../api-calls"


const Feedback = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['feedbackEntries'],
    queryFn: getAllFeedback
  })

  return (
    <section className="mt-16 w-full flex flex-col space-y-14 items-center p-6 text-center">
      <div className="w-full flex items-center flex-col space-y-10">
        <h3 className="text-3xl md:text-5xl font-bold">Community Feedback</h3>
        <div className="flex flex-col space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center p-10">
          {
            !isLoading && 
            data?.map((feedback: Feedback) => {
                return (
                  <FeedbackCard key={feedback.id} feedback={feedback}/>
                )
            })
          }
        </div>
      </div>
      <NewFeedback/>
    </section>
  )
}

export default Feedback