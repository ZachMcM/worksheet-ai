'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllWorksheets } from "../api-calls"
import WorksheetCard from "./WorksheetCard"
import { Worksheet } from "@prisma/client"
import { TbMoodConfuzed } from "react-icons/tb"

const WorksheetList = ({ grid, search } : { grid: boolean, search: string }) => {
  const { isLoading, data } = useQuery({ queryKey: ['worksheets'], queryFn: getAllWorksheets })

  return (
    <div className="w-full">

      {
        isLoading ?
        <div className={`${grid && "lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0"} flex flex-col space-y-10`}>
          {
            (new Array(3)).fill("").map((el: any, i: number) => {
              return <div key={i} className="rounded-md border border-neutral-500 bg-black w-full h-40 animate-pulse"></div>
            })
          }
        </div> :
        !data || data.length == 0 ?
        <div className="w-full p-10 bg-black border border-neutral-500 rounded-md items-center flex flex-col space-y-2 text-center">
          <TbMoodConfuzed className="text-4xl md:text-5xl"/>
          <h3 className="text-xl md:text-2xl font-semibold">Oops. There's nothing here!</h3>
          <p className="font-medium text-sm md:text-md">Try adding some new worksheets by clicking the plus sign.</p>
        </div> :
        <div className={`${grid && "lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0"} flex flex-col space-y-10`}>
          {
            data?.filter((worksheet: Worksheet) => {
              return worksheet.title.toLowerCase().includes(search.toLowerCase())
            })
            .map((worksheet: Worksheet) => {
              return (
                <WorksheetCard key={worksheet.id} worksheet={worksheet}/>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default WorksheetList

