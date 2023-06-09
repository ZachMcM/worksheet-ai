"use client";

import { Worksheet } from "@prisma/client";
import Link from "next/link";
import {
  TbDotsVertical,
} from "react-icons/tb";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import RenameModal from "./RenameModal";
import { useState } from "react";
import SubjectIcon from "./SubjectIcon";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteWorksheet, putWorksheet } from "../api-calls";

const WorksheetCard = ({
  worksheet,
}: {
  worksheet: Worksheet;
}) => {
  const getTimeDifference = (): string => {
    const currentDate = new Date();
    const createdDate = new Date(worksheet.createdAt);
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    if (differenceInDays < 1) {
      return Math.round(differenceInDays * 24) + "h ago";
    }
    return Math.round(differenceInDays) + "d ago";
  };

  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [renameModal, setRenameModal] = useState<boolean>(false);

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteWorksheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worksheets"] })
    }
  })

  const renameMutation = useMutation({
    mutationFn: putWorksheet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worksheets"] })
    }
  })

  return (
    <div className="hover:border-white duration-300 rounded-md border border-neutral-500 bg-black w-full p-8 flex flex-col space-y-5">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-3 items-center">
          <SubjectIcon subject={worksheet.subject}/>
          <Link
            href={`/worksheet/${worksheet.id}`}
            className="text-2xl font-semibold hover:underline duration-300"
          >
            {worksheet.title}
          </Link>
          <div className="relative flex items-center">
            <button
              className="hover:opacity-80 duration-300 m-1 rounded-full"
              onClick={() => setEditModal(!editModal)}
            >
              <TbDotsVertical className="text-2xl" />
            </button>
            {editModal && (
              <EditModal
                editModal={editModal}
                worksheet={worksheet}
                setEditModal={setEditModal}
                setDeleteModal={setDeleteModal}
                setRenameModal={setRenameModal}
              />
            )}
          </div>
        </div>
        <p className="text-neutral-500">{getTimeDifference()}</p>
      </div>
      <div className="flex space-x-3 items-center text-xs font-medium">
        <div className="py-2 px-3 rounded-md text-neutral-500 border border-neutral-500">
          {worksheet.subject}
        </div>
        <div className="py-2 px-3 rounded-md text-neutral-500 border border-neutral-500">
          {worksheet.topic}
        </div>
      </div>
      {renameModal && (
        <RenameModal
          renameMutation={renameMutation}
          renameModal={renameModal}
          setRenameModal={setRenameModal}
          worksheet={worksheet}
        />
      )}
      {deleteModal && (
        <DeleteModal
          deleteMutation={deleteMutation}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          worksheet={worksheet}
        />
      )}
    </div>
  );
};

export default WorksheetCard;
