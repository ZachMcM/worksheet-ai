'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import WorksheetPageHeader from "@/app/components/WorksheetPageHeader"
import SubjectIcon from "@/app/components/SubjectIcon"
import { useQuery } from "@tanstack/react-query"
import { getWorksheetById } from "@/app/api-calls"

const WorksheetPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/dashboard')
    },
  })

  const { isLoading, data } = useQuery(
    { 
      queryKey: ['worksheet', params.id], 
      queryFn: () => getWorksheetById(params.id)
    })

  return (
    <section className="w-full">
    {
      data && 
      <WorksheetPageHeader 
        worksheet={data}
      />
    }
    <div className="py-8 md:py-14 justify-center flex space-y-10">
      {
        !isLoading &&
        <>
          {
            !data ? redirect("/dashboard") :
            <div className="flex-col flex space-y-7 p-6 lg:w-1/2">
              <div className="flex flex-col space-y-5">
                <div className="flex items-center space-x-3.5">
                  <div className="text-3xl md:text-6xl">
                    <SubjectIcon subject={data.subject}/>
                  </div>
                  <h1 className="font-bold text-3xl md:text-5xl">{data.title}</h1>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="p-2.5 rounded-md border border-neutral-500 text-neutral-500">
                    <p>{data.subject}</p>
                  </div>
                  <div className="p-2.5 rounded-md border border-neutral-500 text-neutral-500">
                    <p>{data.topic}</p>
                  </div>
                </div>
              </div>
              <iframe src={data.pdfLink} className="h-[40rem] max-w-full"/>
            </div>
          }
        </>
      }
    </div>
  </section>
  )
}

export default WorksheetPage