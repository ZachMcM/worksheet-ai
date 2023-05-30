import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"

export default function Home() {
  return (
    <main className="w-screen h-screen bg-gradient-to-r from-white to-teal-100 flex flex-col justify-between">
      <Navbar/>
      <div className="w-full flex justify-center">
        <div className="w-full flex items-center flex-col space-y-6">
          <h1 className="text-6xl font-extrabold">Crush your next speech</h1>
          <p className="text-xl max-w-3xl text-center">Prepare for your next speech, presentation, or just improve your speaking in general with AI assisted speech coaching!</p>
          <div className="flex space-x-8 items-center">
            <Link href="/about" className="px-4 py-2 text-white font-medium rounded-md bg-teal-500 hover:bg-opacity-80 duration-300">About</Link>
            <Link href="/dashboard" className="font-medium flex space-x-2 items-center hover:opacity-80 duration-300">
              <p>Get Started</p>
              <FiArrowRight/>
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
  )
}
