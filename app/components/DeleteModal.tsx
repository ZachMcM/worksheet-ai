'use client'

import { Worksheet } from ".prisma/client"
import { Dispatch, SetStateAction } from "react"
import { TbInfoCircle } from "react-icons/tb"
import { useDetectClickOutside } from "react-detect-click-outside"
import Loading from "./Loading"
import { useState } from "react"

const DeleteModal = ({ worksheet, setDeleteModal, updateCount, setUpdateCount }: { worksheet: Worksheet, setDeleteModal: Dispatch<SetStateAction<boolean>>, updateCount: number, setUpdateCount: Dispatch<SetStateAction<number>> }) => {
  const closeModal = () => {
    setDeleteModal(false)
  }

  const [loading, setLoading] = useState<boolean>(false)

  const confirmDelete = async () => {
    console.log("delete confirmed")
    setLoading(true)
    const res = await fetch(`/api/delete-worksheet?worksheetId=${worksheet.id}`, {
      method: "DELETE"
    })
    const data = await res.json()
    console.log(data.deletedWorksheet)
    setLoading(false)
    setDeleteModal(false)
    setUpdateCount(updateCount + 1)
  }
  
  const ref = useDetectClickOutside({ onTriggered: closeModal})

  return (
    <div className="w-full fixed top-0 bottom-0 left-0 bg-black/95 z-50 flex justify-center items-center">
      <div ref={ref}  className="p-6 bg-black rounded-md flex flex-col items-center space-y-5 text-neutral-500 border border-neutral-500">
        <TbInfoCircle className="text-5xl"/>
        <h3 className="font-medium text-xl text-center text-white">Are you sure you want to delete this worksheet?</h3>
        <div className="flex items-center space-x-5">
          <button
            className="py-2 px-4 rounded-md border border-neutral-500 hover:opacity-80 duration-300"
            onClick={() => setDeleteModal(false)}
          >
            <p>No, cancel</p>
          </button>
          <button
            className="py-2 px-4 rounded-md bg-red-500 text-white hover:opacity-80 duration-300"
            onClick={confirmDelete}
          >
            <p>Yes, I'm sure</p>
          </button>
        </div>
      </div>
      {loading && <Loading/>}
    </div>
  )
}

export default DeleteModal