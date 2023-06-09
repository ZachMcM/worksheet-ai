'use client'

import { FiGrid, FiList, FiPlus, FiSearch } from "react-icons/fi"
import { useState } from "react"
import NewWorkSheetModal from "../components/NewWorksheetModal"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import WorksheetList from "../components/WorksheetList"

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/dashboard')
    },
  })
  
  const [grid, setGrid] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [newWorkSheetModal, setNewWorksheetModal] = useState<boolean>(false)

  return (
    <section>
      <div className="py-10 px-5 md:p-20 w-full flex flex-col space-y-5 md:space-y-10 items-center">
        <div className="flex space-x-3 md:space-x-2 w-full justify-center">
          <div className="flex items-center w-full bg-black border border-neutral-500 focus-within:border-white duration-300 rounded-md">
            <div className="pl-3.5">
              <FiSearch className="text-xl text-neutral-500"/>
            </div>
            <input 
              type="text" 
              value={search}
              className="w-full h-full outline-none border-none bg-transparent p-3.5 placeholder:text-neutral-500"
              placeholder="Search by title, subject or topic..."
              onChange={(e) => setSearch(e.target.value)}
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
          <button 
            className="flex items-center xl:space-x-2 bg-white text-black py-2.5 px-3 font-medium rounded-md hover:bg-opacity-80 duration-300"
            onClick={() => setNewWorksheetModal(true)}
          >
            <p className="hidden xl:block">New</p>
            <FiPlus className="text-2xl"/>
          </button>
        </div>
        <WorksheetList search={search} grid={grid}/>
      </div>
      {
        newWorkSheetModal &&
        <NewWorkSheetModal setNewWorksheetModal={setNewWorksheetModal}/>
      }
    </section>
  )
}

export default Dashboard