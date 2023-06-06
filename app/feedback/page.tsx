import { Feedback } from "@prisma/client"
import FeedbackCard from "../components/FeedbackCard"
import NewFeedback from "../components/NewFeedback"

const getFeedbackEntries = async (): Promise<Feedback[]> => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/all-feedback?secret=${process.env.SERVER_API_SECRET}`, {cache: "no-store"})
  const data = await res.json()
  console.log(data)
  return data.feedbackEntries
} 

const Feedback = async () => {
  const feedbackEntries = await getFeedbackEntries()

  return (
    <section className="mt-16 w-full flex flex-col space-y-14 items-center p-6 text-center">
      <div className="w-full flex items-center flex-col space-y-10">
        <h3 className="text-3xl md:text-5xl font-bold">Community Feedback</h3>
        <div className="flex flex-col space-y-5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center p-10">
          {
            feedbackEntries.map((feedback: Feedback) => {
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