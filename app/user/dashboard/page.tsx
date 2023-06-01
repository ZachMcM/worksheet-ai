'use client'

import Link from "next/link"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { FiGrid, FiList, FiPlus, FiSearch } from "react-icons/fi"
import { useEffect, useState } from "react"
import { uid } from "uid"

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/signin?callbackUrl=/user/dashboard')
    },
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [grid, setGrid] = useState<boolean>(true)
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    const getData = async () => {
    }
    getData()
  }, [])

  return (
    <section>
      <div className="py-10 px-5 md:p-20 w-full flex flex-col items-center">
        <div className="flex items-center space-x-3 md:space-x-5 w-full justify-center">
          <div className="flex items-center w-3/4 bg-black border border-neutral-500 focus-within:border-white duration-300 rounded-md">
            <div className="pl-3.5">
              <FiSearch className="text-xl text-neutral-500"/>
            </div>
            <input 
              type="text" 
              value={input}
              className="w-full h-full outline-none border-none bg-transparent p-3.5 placeholder:text-neutral-500"
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="hidden lg:flex p-2 font-medium rounded-md bg-black border border-neutral-500 space-x-1.5">
            <button 
              className={`p-1.5 duration-300 rounded-md ${!grid && "text-neutral-500"} ${grid && "bg-neutral-800"}`}
              onClick={() => setGrid(true)}
            >
              <FiGrid className="text-xl"/>
            </button>
            <button 
              className={`p-1.5 duration-300 rounded-md ${grid && "text-neutral-500"} ${!grid && "bg-neutral-800 text-white"}`}
              onClick={() => setGrid(false)}
            >
              <FiList className="text-xl"/>
            </button>
          </div>
          <Link href="/user/new" className="flex items-center xl:space-x-2 bg-white text-black p-2.5 font-medium rounded-md hover:bg-opacity-80 duration-300">
            <p className="hidden xl:block">Add New</p>
            <FiPlus className="text-xl"/>
          </Link>
        </div>
        <div className="p-10 w-full">
          <div className={`${grid && "lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0"} flex flex-col space-y-10`}>
            {
              loading ? 
              (new Array(3)).fill("").map((el: any) => {
                return <div key={uid()} className="rounded-md border border-neutral-500 bg-black w-full h-80 animate-pulse"></div>
              }) 
              : <></>
            }
          </div>
      </div>
      </div>
    </section>
  )
}

export default Dashboard