'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Worksheet } from "@prisma/client"
import { TbAtom, TbBooks, TbBuildingBank, TbMathIntegralX, TbSchool } from "react-icons/tb"

const Worksheet = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/signin?callbackUrl=/user/dashboard')
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
    return <TbSchool/>
  }

  const [loading, setLoading] = useState<boolean>(true)
  const [worksheet, setWorksheet] = useState<Worksheet>()

  useEffect(() => {
    const getWorksheet = async () => {
      const worksheetId = params.id
      const res = await fetch(`/api/get-worksheet?worksheetId=${worksheetId}`)
      const data = await res.json()
      setWorksheet(data.worksheet)
      console.log(data.worksheet)
      setLoading(false)
    }
    getWorksheet()
  }, [])

  return (
    <section className="w-full">
    <div className="py-8 md:py-14 justify-center flex space-y-10">
      {
        !loading &&
        <>
          {
            worksheet == undefined ? redirect("/user/dashboard") :
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
              <embed src={worksheet?.pdfLink} type="application/pdf" className="h-[40rem]"/>
            </div>
          }
        </>
      }
    </div>
  </section>
  )
}

export default Worksheet