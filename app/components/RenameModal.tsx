"use client";

import { TbPencil, TbX } from "react-icons/tb";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Dispatch, SetStateAction, useState } from "react";
import { Worksheet } from "@prisma/client";
import { UseMutationResult } from "@tanstack/react-query";

const RenameModal = ({
  worksheet,
  renameModal,
  setRenameModal,
  renameMutation,
}: {
  worksheet: Worksheet;
  setRenameModal: Dispatch<SetStateAction<boolean>>;
  renameModal: boolean
  renameMutation: UseMutationResult<
    Worksheet,
    unknown,
    {
      newName: string;
      id: string;
    },
    unknown
  >;
}) => {
  const [input, setInput] = useState<string>(worksheet.title);

  const closeModal = () => {
    setRenameModal(false);
  };

  const ref = useDetectClickOutside({ onTriggered: closeModal });

  return (
    <div className={`${renameModal ? "flex" : "hidden"} w-full fixed top-0 bottom-0 left-0 bg-black/95 z-50 justify-center items-center`}>
      <div
        ref={ref}
        className="p-10 bg-black rounded-md flex flex-col space-y-8 border border-neutral-500 md:w-1/2 lg:w-1/3"
      >
        <h3 className="font-medium text-xl">Rename Worksheet</h3>
        <div className="flex space-x-2 p-3.5 border rounded-md border-neutral-500 items-center text-neutral-500">
          <TbPencil className="text-xl" />
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
            onClick={() => {
              if (input != "" && input != " ") {
                renameMutation.mutate({
                  newName: input,
                  id: worksheet.id
                })
                setRenameModal(false)
              }
            }}
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
    </div>
  );
};

export default RenameModal;
