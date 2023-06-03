'use client'

import { TbMailbox, TbArrowRight, TbCheck } from "react-icons/tb"
import { useState } from "react"

const MailList = () => {
  const [email, setEmail] = useState<string>('')
  const [submittedEmail, setSubmittedEmail] = useState<boolean>(false)

  const submitEmail = async () => {
    const re = /\S+@\S+\.\S+/
      if (email && re.test(email)) {
        const res = await fetch(`https://worksheetai.app/api/new-waitlist?email=${email}`, {
          method: 'POST'
        })
        if (res.status != 400) {
          const data = await res.json()
          console.log(data)
          setSubmittedEmail(true)
          setEmail('')
        }
      }
  }

  return (
    <>
      <section className="w-screen h-screen flex justify-center items-center mt-32">
        <div className="flex flex-col space-y-8 items-center p-6">
          <h3 className="font-bold text-3xl md:text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Boost your productivity. Join the waitlist today to use the app.</h3>
          <p className="font-medium max-w-md text-center">We are in closed beta currently. Enter your email on the waitlist for a chance to try it out!</p>
          <div className="w-4/5 flex space-x-2 items-center border p-3.5 rounded-md focus-within:border-white border-neutral-500">
            <TbMailbox className="text-xl text-neutral-500"/>
            <input
              value={email}
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none placeholder:text-neutral-500 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="py-2 px-4  rounded-md bg-white text-black hover:bg-opacity-80 duration-300 flex items-center space-x-2"
            onClick={submitEmail}
          >
            <p className="font-medium">Submit</p>
            <TbArrowRight className="text-xl"/>
          </button>
        </div>
      </section>
      {
        submittedEmail && 
        <div className="w-full h-full fixed min-h-screen top-0 bottom-0 left-0 z-50 backdrop-blur-md flex justify-center items-center">
          <div className="flex flex-col space-y-3 rounded-md p-6 bg-white text-black items-center">
            <p className="font-medium text-xl">Thank you, you are now on our waitlist!</p>
            <button
              className="flex items-center space-x-2 bg-black text-white rounded-md px-4 py-2 w-fit font-medium"
              onClick={() => setSubmittedEmail(false)}
            >
              <p>Ok</p>
              <TbCheck className="text-xl"/>
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default MailList