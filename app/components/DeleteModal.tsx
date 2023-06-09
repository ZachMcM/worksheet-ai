"use client";

import { Worksheet } from ".prisma/client";
import { Dispatch, SetStateAction } from "react";
import { TbInfoCircle } from "react-icons/tb";
import { useDetectClickOutside } from "react-detect-click-outside";
import { UseMutationResult } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import Loading from "./Loading";

const DeleteModal = ({
  worksheet,
  deleteModal,
  setDeleteModal,
  deleteMutation,
}: {
  worksheet: Worksheet;
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  deleteMutation: UseMutationResult<
    Worksheet,
    unknown,
    {
      id: string;
    },
    unknown
  >;
}) => {
  const closeModal = () => {
    setDeleteModal(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeModal });

  return (
    <div
      className={`w-full fixed top-0 bottom-0 left-0 bg-black/95 z-50 ${
        deleteModal ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div
        ref={ref}
        className="p-6 bg-black rounded-md flex flex-col items-center space-y-5 text-neutral-500 border border-neutral-500"
      >
        <TbInfoCircle className="text-5xl" />
        <h3 className="font-medium text-xl text-center text-white">
          Are you sure you want to delete this worksheet?
        </h3>
        <div className="flex items-center space-x-5">
          <button
            className="py-2 px-4 rounded-md border border-neutral-500 hover:opacity-80 duration-300"
            onClick={() => setDeleteModal(false)}
          >
            <p>No, cancel</p>
          </button>
          <button
            className="py-2 px-4 rounded-md bg-red-500 text-white hover:opacity-80 duration-300"
            onClick={() => {
              deleteMutation.mutate({
                id: worksheet.id,
              });
              setDeleteModal(false);
            }}
          >
            <p>Yes, I'm sure</p>
          </button>
        </div>
      </div>
      {deleteMutation.isLoading && <Loading/>}
      {deleteMutation.isSuccess && redirect("/dashboard")}
    </div>
  );
};

export default DeleteModal;
