import Navbar from "./components/Navbar"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import MailList from "./components/MailList"
import { TbBooks, TbRobot, TbRun, TbSchool } from "react-icons/tb"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <section className="mt-32 w-full flex justify-center p-6 text-center">
        <div className="w-full flex items-center flex-col space-y-6">
          <div className="text-neutral-500 border border-neutral-500 rounded-full py-2 px-4 text-xs">
            <p>Just shipped v1.0.0</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Get a worksheet. Fast.</h1>
          <p className="md:text-xl max-w-3xl text-center font-medium">Stop wasting time scowering the internet for useless worksheets, use AI to create the one for you so you can focus on the actual worksheet</p>
          <div className="flex space-x-3 items-center">
            {/* <Link href="/about" className="px-4 py-2 font-medium">About</Link> */}
            <a href="#mail-list" className="font-medium flex space-x-2 items-center py-2 px-4 rounded-md bg-white text-black hover:bg-opacity-80 duration-300">
              <p>Get Started</p>
              <FiArrowRight/>
            </a>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-col space-y-10 items-center mt-32">
        <div className="flex flex-col space-y-4 text-center p-6">
          <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Easy</p>
          <h3 className="font-bold text-3xl md:text-4xl">Generative AI to your advantage</h3>
          <p className="font-medium max-w-xl">We use AI to generate a pdf worksheet with just a few clicks.</p>
        </div>
        <div className="w-full py-8 lg:py-14 md:px-14 lg:px-28 flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-14 text-center md:text-start items-center">
          <div className="flex flex-col space-y-3 max-w-xs items-center md:items-start">
            <div className="rounded-md bg-white p-1.5 w-fit">
              <TbRun className="text-2xl text-black"/>
            </div>
            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Fast generation</p>
            <p className="font-medium">Your worksheet is generated nearly instantaneously.</p>
          </div>
          <div className="flex flex-col space-y-3 max-w-xs items-center md:items-start">
            <div className="rounded-md bg-white p-1.5 w-fit">
              <TbBooks className="text-2xl text-black"/>
            </div>
            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Any subject and topic</p>
            <p className="font-medium">You can generate a worksheet for any subject or topic you can think of.</p>
          </div>
          <div className="flex flex-col space-y-3 max-w-xs items-center md:items-start">
            <div className="rounded-md bg-white p-1.5 w-fit">
              <TbRobot className="text-2xl text-black"/>
            </div>
            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Latest AI</p>
            <p className="font-medium">We use the latest AI technology to generate worksheets.</p>
          </div>
          <div className="flex flex-col space-y-3 max-w-xs items-center md:items-start">
            <div className="rounded-md bg-white p-1.5 w-fit">
              <TbSchool className="text-2xl text-black"/>
            </div>
            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Teahers and Students</p>
            <p className="font-medium">Teachers can use for classes and students for studying.</p>
          </div>
        </div>
      </section>
      <MailList/>
    </div>
  )
}
