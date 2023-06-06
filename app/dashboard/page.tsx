'use client'

import { FiGrid, FiList, FiPlus, FiSearch } from "react-icons/fi"
import { useEffect, useState } from "react"
import { uid } from "uid"
import { Worksheet } from "@prisma/client"
import WorksheetCard from "@/app/components/WorksheetCard"
import NewWorkSheetModal from "../components/NewWorksheetModal"
import Navbar from "../components/Navbar"
import { TbMoodConfuzed } from "react-icons/tb"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/signin?callbackUrl=/dashboard')
    },
  })
  
  const [loading, setLoading] = useState<boolean>(true)
  const [grid, setGrid] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [worksheets, setWorksheets] = useState<Worksheet[]>([])
  const [filteredWorksheets, setFilteredWorksheetes] = useState<Worksheet[]>([])
  const [updateCount, setUpdateCount] = useState<number>(0)
  const [newWorkSheetModal, setNewWorksheetModal] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/get-all-worksheets")
      const data = await res.json()
      const unorganizedWorksheets: Worksheet[] = data.worksheets
      const organizedWorksheets = unorganizedWorksheets.sort((a, b) => {
        return (new Date(b.updatedAt)).getTime() - (new Date(a.updatedAt)).getTime()
      })
      setWorksheets(organizedWorksheets)
      setFilteredWorksheetes(organizedWorksheets)
      setLoading(false)
    }
    getData()
  }, [updateCount])

  const search = (query: string) => {
    setInput(query)
    const oldFiltereds = worksheets
    const newFiltereds = oldFiltereds.filter((worksheet: Worksheet) => {
      return worksheet.title.toLowerCase().includes(query.toLowerCase()) || worksheet.subject.toLowerCase().includes(query.toLowerCase()) || worksheet.topic.toLowerCase().includes(query.toLowerCase())
    })
    setFilteredWorksheetes(newFiltereds)
  }

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
              value={input}
              className="w-full h-full outline-none border-none bg-transparent p-3.5 placeholder:text-neutral-500"
              placeholder="Search by title, subject or topic..."
              onChange={(e) => search(e.target.value)}
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
        <div className="w-full">
          {
            loading ? 
            <div className={`${grid && "lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0"} flex flex-col space-y-10`}>
              {
                (new Array(3)).fill("").map((el: any) => {
                  return <div key={uid()} className="rounded-md border border-neutral-500 bg-black w-full h-40 animate-pulse"></div>
                }) 
              }
            </div> :
            worksheets.length > 0 ?
            <div className={`${grid && "lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0"} flex flex-col space-y-10`}>
            {
              filteredWorksheets.map((worksheet: Worksheet) => {
                return (
                  <WorksheetCard key={worksheet.id} setUpdateCount={setUpdateCount} updateCount={updateCount} worksheet={worksheet}/>
                )
              })
            }
            </div> :
            <div className="w-full p-10 bg-black border border-neutral-500 rounded-md items-center flex flex-col space-y-2 text-center">
              <TbMoodConfuzed className="text-4xl md:text-5xl"/>
              <h3 className="text-xl md:text-2xl font-semibold">Oops. There's nothing here!</h3>
              <p className="font-medium text-sm md:text-md">Try adding some new worksheets by clicking the plus sign.</p>
            </div>
          }
        </div>
      </div>
      {
        newWorkSheetModal &&
        <NewWorkSheetModal setNewWorksheetModal={setNewWorksheetModal}/>
      }
    </section>
  )
}

export default Dashboard