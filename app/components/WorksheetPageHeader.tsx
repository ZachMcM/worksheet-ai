"use client";

import { Worksheet } from "@prisma/client";
import Link from "next/link";
import {
  TbArrowLeft,
  TbDotsVertical,
} from "react-icons/tb";
import { useState } from "react";
import RenameModal from "./RenameModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import SubjectIcon from "./SubjectIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteWorksheet, putWorksheet } from "@/app/api-calls"

const WorksheetPageHeader = ({
  worksheet,
}: {
  worksheet: Worksheet;
}) => {
  const [renameModal, setRenameModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteWorksheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worksheet', worksheet.id]})
      queryClient.invalidateQueries({ queryKey: ["worksheets"] })
    }
  })

  const renameMutation = useMutation({
    mutationFn: putWorksheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worksheet', worksheet.id]})
      queryClient.invalidateQueries({ queryKey: ["worksheets"] })
    }
  })

  return (
    <header className="sticky top-0 left-0 bg-black border-b border-neutral-500 w-full py-4 md:py-8 px-5 md:px-10 flex items-center justify-between">
      <Link
        href="/dashboard"
        className="rounded-md flex items-center sapce-x-1 md:space-x-2 hover:opacity-80 duration-300 w-fit text-xs md:text-base"
      >
        <TbArrowLeft className="text-xl" />
        <p className="font-medium hidden md:block">Back</p>
      </Link>
      <div className="flex items-center space-x-1 md:space-x-3">
        <SubjectIcon subject={worksheet.subject} />
        <h3 className="min-w-max font-bold text-xs md:text-xl text-center place-self-center">
          {worksheet.title}
        </h3>
      </div>
      <div className="relative">
        <button
          className="flex items-center hover:opacity-80 duration-300 place-self-start space-x-2"
          onClick={() => setEditModal(true)}
        >
          <p className="font-medium text-sm">More</p>
          <TbDotsVertical className="text-xl md:text-2xl" />
        </button>
        <EditModal
            worksheetPage={true}
            worksheet={worksheet}
            editModal={editModal}
            setEditModal={setEditModal}
            setDeleteModal={setDeleteModal}
            setRenameModal={setRenameModal}
          />
      </div>
      <RenameModal
          worksheet={worksheet}
          renameModal={renameModal}
          setRenameModal={setRenameModal}
          renameMutation={renameMutation}
      />
      <DeleteModal
        deleteModal={deleteModal}
        worksheet={worksheet}
        setDeleteModal={setDeleteModal}
        deleteMutation={deleteMutation}
      />
    </header>
  );
};

export default WorksheetPageHeader;
