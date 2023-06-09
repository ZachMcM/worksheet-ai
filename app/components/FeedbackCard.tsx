'use client'

import { Feedback } from "@prisma/client";
import { TbStar, TbStarFilled } from "react-icons/tb";

const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="p-6 rounded-md bg-white text-black flex flex-col space-y-3 max-h-52 overflow-y-scroll">
      <div className="flex space-x-3 items-center">
        <h3 className="text-start text-lg font-semibold">{feedback.title}</h3>
        <div className="flex items-center space-x-2">
          {
            feedback.numStars >= 1 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
          {
            feedback.numStars >= 2 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
          {
            feedback.numStars >= 3 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
          {
            feedback.numStars >= 4 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
          {
            feedback.numStars >= 5 ?
            <TbStarFilled className="text-yellow-500"/> :
            <TbStar/>
          }
        </div>
      </div>
      <p className="font-medium text-start">{feedback.content}</p>
    </div>
  )
}

export default FeedbackCard