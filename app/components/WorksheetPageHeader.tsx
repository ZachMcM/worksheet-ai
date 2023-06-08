'use client'

import { Worksheet } from "@prisma/client"
import Link from "next/link"
import { TbArrowLeft, TbAtom, TbBooks, TbBuildingBank, TbCode, TbDotsVertical, TbMathIntegralX, TbSchool } from "react-icons/tb"
import { Dispatch, SetStateAction, useState } from "react"
import RenameModal from "./RenameModal"
import DeleteModal from "./DeleteModal"
import EditModal from "./EditModal"

const WorksheetPageHeader = ({ worksheet, updateCount, setUpdateCount }: { worksheet: Worksheet, updateCount: number, setUpdateCount: Dispatch<SetStateAction<number>> }) => {
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
      return <TbMathIntegralX className="text-xl"/>
    }
    if (englishSubjects.includes(subject)) {
      return <TbBooks className="text-xl"/>
    }
    if (scienceSubjects.includes(subject)) {
      return <TbAtom className="text-xl"/>
    }
    if (socialStudiesSubjects.includes(subject)) {
      return <TbBuildingBank className="text-xl"/>
    }
    if (csSubjects.includes(subject)) {
      return <TbCode className="text-xl"/>
    }
    return <TbSchool className="text-xl"/>
  }

  const [renameModal, setRenameModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [editModal, setEditModal] = useState<boolean>(false)

  return (
    <header className="sticky top-0 left-0 bg-black border-b border-neutral-500 w-full py-4 md:py-8 px-5 md:px-10 flex items-center justify-between">
      <Link href="/dashboard" className="rounded-md flex items-center sapce-x-1 md:space-x-2 hover:opacity-80 duration-300 w-fit text-xs md:text-base">
        <TbArrowLeft className="text-xl"/>
        <p className="font-medium hidden md:block">Back</p>
      </Link>
      <div className="flex items-center space-x-1 md:space-x-3">
        {getIcon(worksheet.subject)}
        <h3 className="min-w-max font-bold text-xs md:text-xl text-center place-self-center">{worksheet.title}</h3>
      </div>
      <div className="relative">
        <button 
          className="flex items-center hover:opacity-80 duration-300 place-self-start space-x-2"
          onClick={() => setEditModal(true)}
        >
          <p className="font-medium text-sm">More</p>
          <TbDotsVertical className="text-xl md:text-2xl"/>
        </button>
        {
          editModal &&
          <EditModal
            worksheetPage={true}
            worksheet={worksheet}
            setEditModal={setEditModal}
            setDeleteModal={setDeleteModal}
            setRenameModal={setRenameModal}
          />
        }
      </div>
      {
        renameModal &&
        <RenameModal
          worksheet={worksheet}
          setRenameModal={setRenameModal}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      }
      {
        deleteModal &&
        <DeleteModal
          worksheet={worksheet}
          setDeleteModal={setDeleteModal}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      }
    </header>
  )
}

export default WorksheetPageHeader