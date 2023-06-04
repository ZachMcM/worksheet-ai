'use client'

import { Worksheet } from "@prisma/client"
import Link from "next/link"
import { TbChevronDown, TbDots, TbEdit, TbShare3, TbTrash } from "react-icons/tb"
import { Dispatch, SetStateAction, useState } from "react"
import RenameModal from "./RenameModal"
import DeleteModal from "./DeleteModal"
import EditModal from "./EditModal"

const WorksheetPageHeader = ({ worksheet, updateCount, setUpdateCount }: { worksheet: Worksheet, updateCount: number, setUpdateCount: Dispatch<SetStateAction<number>> }) => {
  const [renameModal, setRenameModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [editModal, setEditModal] = useState<boolean>(false)

  return (
    <header className="sticky top-0 left-0 bg-black border-b border-neutral-500 w-full py-4 md:py-8 px-5 md:px-10 flex items-center justify-between">
      <div className="relative">
        <button 
          className="flex items-center p-2.5 hover:opacity-80 duration-300 place-self-start"
          onClick={() => setEditModal(true)}
        >
          <TbDots className="text-2xl"/>
        </button>
        {
          editModal &&
          <EditModal
            notDashboard={true}
            worksheet={worksheet}
            setEditModal={setEditModal}
            setDeleteModal={setDeleteModal}
            setRenameModal={setRenameModal}
          />
        }
      </div>
      <h3 className="min-w-max font-bold text-lg md:text-xl text-center place-self-center">{worksheet.title}</h3>
      <Link href="/dashboard" className="bg-white text-black md:px-4 px-3 py-2 rounded-md flex items-center space-x-1 hover:opacity-80 duration-300 w-fit text-xs md:text-base">
        <p className="font-medium">Dashboard</p>
      </Link>
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

//bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500