'use client'

import { TbPencil, TbX } from "react-icons/tb"
import { useDetectClickOutside } from "react-detect-click-outside"
import { Dispatch, SetStateAction, useState } from "react"
import { Worksheet } from "@prisma/client"
import Loading from "./Loading"

const RenameModal = ({ worksheet, setRenameModal, updateCount, setUpdateCount } : { worksheet: Worksheet, setRenameModal: Dispatch<SetStateAction<boolean>>, setUpdateCount: Dispatch<SetStateAction<number>>, updateCount: number }) => {
  const [input, setInput] = useState<string>(worksheet.title)
  const [loading, setLoading] = useState<boolean>(false)

  const closeModal = () => {
    setRenameModal(false)
  }

  const confirmRename = async () => {
    if (input && input != "") {
      setLoading(true)
      const res = await fetch(`/api/update-worksheet?worksheetId=${worksheet.id}&newTitle=${input}`, {
        method: "PUT"
      })
      const data = await res.json()
      console.log(data.updatedWorksheet)
      setLoading(false)
      setRenameModal(false)
      setUpdateCount(updateCount + 1)
    }
  }

  const ref = useDetectClickOutside({onTriggered: closeModal})

  return (
    <div className="w-full fixed top-0 bottom-0 left-0 bg-black/95 z-50 flex justify-center items-center">
      <div ref={ref} className="p-10 bg-black rounded-md flex flex-col space-y-8 border border-neutral-500 md:w-1/2 lg:w-1/3">
        <h3 className="font-medium text-xl">Rename Worksheet</h3>
        <div className="flex space-x-2 p-3.5 border rounded-md border-neutral-500 items-center text-neutral-500">
          <TbPencil className="text-xl"/>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text" 
            placeholder="Enter your new name"
            className="w-full placeholder:text-neutral-500 bg-black text-white border-none outline-none"
          />
        </div>
        <div className="flex items-center space-x-5">
          <button 
            className="bg-white text-black px-4 py-2 rounded-md font-medium hover:opacity-80 duration-300"
            onClick={confirmRename}
          >
            <p>Rename</p>
          </button>
          <button 
            className="border border-neutral-500 text-neutral-500 px-4 py-2 rounded-md font-medium hover:opacity-80 duration-300"
            onClick={closeModal}
          >
            <p>Cancel</p>
          </button>
        </div>
      </div>
      {loading && <Loading/>}
    </div>
  )
}

export default RenameModal