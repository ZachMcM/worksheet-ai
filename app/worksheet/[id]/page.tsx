'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Worksheet } from "@prisma/client"
import { TbAtom, TbBooks, TbBuildingBank, TbCode, TbMathIntegralX, TbSchool, TbTrash } from "react-icons/tb"
import WorksheetPageHeader from "@/app/components/WorksheetPageHeader"

const Worksheet = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/dashboard')
    },
  })

  const getIcon = (subject: string) => {
    const mathSubjects: string[] = [
      "Algebra",
      "Geometry",
      "Calculus",
      "Statistics",
      "Probability",
      "Trigonometry",
      "Number Theory",
      "Linear Algebra",
      "Differential Equations",
      "Mathematical Logic",
      "Discrete Mathematics",
    ];
    const scienceSubjects: string[] = [
      "Physics",
      "Chemistry",
      "Biology",
      "Astronomy",
      "Earth Science",
      "Environmental Science",
      "Geology",
      "Botany",
      "Zoology",
      "Microbiology",
      "Genetics",
    ];
    const socialStudiesSubjects: string[] = [
      "History",
      "Geography",
      "Civics",
      "Government",
      "Economics",
      "Sociology",
      "Anthropology",
      "Archaeology",
      "Psychology",
      "Cultural Studies",
      "World Religions",
    ];
    const englishSubjects: string[] = [
      "Literature",
      "Grammar",
      "Composition",
      "Creative Writing",
      "Poetry",
      "Drama",
      "Fiction",
      "Nonfiction",
      "English Language",
      "English Literature",
      "English Phonetics",
    ];
    const csSubjects: string[] = [
      "Computer Science",
      "Operating Systems",
      "Object Oriented Programming",
      "Data Structures and Algorithms",
      "Theory of Computation",
      "Web Development"
    ]

    if (mathSubjects.includes(subject)) {
      return <TbMathIntegralX/>
    }
    if (englishSubjects.includes(subject)) {
      return <TbBooks/>
    }
    if (scienceSubjects.includes(subject)) {
      return <TbAtom/>
    }
    if (socialStudiesSubjects.includes(subject)) {
      return <TbBuildingBank/>
    }
    if (csSubjects.includes(subject)) {
      return <TbCode/>
    }
    return <TbSchool/>
  }

  const [loading, setLoading] = useState<boolean>(true)
  const [worksheet, setWorksheet] = useState<Worksheet>()
  const [updateCount, setUpdateCount] = useState<number>(0)

  useEffect(() => {
    const getWorksheet = async () => {
      const worksheetId = params.id
      const res = await fetch(`/api/get-worksheet?worksheetId=${worksheetId}`)
      const data = await res.json()
      setWorksheet(data.worksheet)
      if (res.status == 400 || res.status == 500) {
        const data = await res.json()
        console.log(data)
      } else {
        console.log("Worksheet loaded")
      }
      setLoading(false)
    }
    getWorksheet()
  }, [updateCount])

  return (
    <section className="w-full">
    {
      worksheet && 
      <WorksheetPageHeader 
        worksheet={worksheet}
        updateCount={updateCount}
        setUpdateCount={setUpdateCount}
      />
    }
    <div className="py-8 md:py-14 justify-center flex space-y-10">
      {
        !loading &&
        <>
          {
            worksheet == undefined || worksheet == null ? redirect("/dashboard") :
            <div className="flex-col flex space-y-7 p-6 lg:w-1/2">
              <div className="flex flex-col space-y-5">
                <div className="flex items-center space-x-3.5">
                  <div className="text-3xl md:text-6xl">
                    {getIcon(worksheet.subject)}
                  </div>
                  <h1 className="font-bold text-3xl md:text-5xl">{worksheet?.title}</h1>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="p-2.5 rounded-md border border-neutral-500 text-neutral-500">
                    <p>{worksheet?.subject}</p>
                  </div>
                  <div className="p-2.5 rounded-md border border-neutral-500 text-neutral-500">
                    <p>{worksheet?.topic}</p>
                  </div>
                </div>
              </div>
              <iframe src={worksheet.pdfLink} className="h-[40rem] max-w-full"/>
            </div>
          }
        </>
      }
    </div>
  </section>
  )
}

export default Worksheet