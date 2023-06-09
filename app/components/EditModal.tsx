"use client";

import { Worksheet } from "@prisma/client";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Dispatch, SetStateAction } from "react";
import { TbChevronDown, TbEdit, TbShare3, TbTrash } from "react-icons/tb";

const EditModal = ({
  worksheet,
  editModal,
  setEditModal,
  setDeleteModal,
  setRenameModal,
  worksheetPage,
}: {
  worksheet: Worksheet;
  editModal: boolean,
  setEditModal: Dispatch<SetStateAction<boolean>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  setRenameModal: Dispatch<SetStateAction<boolean>>;
  worksheetPage?: boolean;
}) => {
  const closeModal = () => {
    setEditModal(false);
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        url: worksheet.pdfLink,
        title: worksheet.title,
        text: "Check out this worksheet from https://worksheetai.app",
      });
    } else {
      await navigator.clipboard.writeText(
        `Check out this worksheet ${encodeURI(
          worksheet.pdfLink
        )} from https://worksheetai.app`
      );
      alert("Copied to clipboard");
      setEditModal(false);
    }
  };

  const ref = useDetectClickOutside({ onTriggered: closeModal });

  return (
    <div
      ref={ref}
      className={`absolute ${
        !worksheetPage ? "md:top-0 md:left-12 top-14 left-[-7rem]" : "lg:top-10 right-0 top-5 lg:right-3"
      } w-40 text-lg z-40 ${editModal ? "flex" : "hidden"} flex-col bg-white text-black rounded-md border border-neutral-500`}
    >
      {worksheetPage && (
        <a
          href={worksheet.pdfLink}
          className="px-4 py-3 hover:bg-neutral-100 text-start duration-300 flex items-center space-x-2"
        >
          <p>Open</p>
          <TbChevronDown className="text-xl" />
        </a>
      )}
      <button
        className="px-4 py-3 hover:bg-neutral-100 text-start duration-300 flex items-center space-x-2"
        onClick={() => {
          setEditModal(false);
          setRenameModal(true);
        }}
      >
        <p>Rename</p>
        <TbEdit className="text-xl" />
      </button>
      <button
        className="px-4 py-3 hover:bg-neutral-100 text-start duration-300 flex items-center space-x-2"
        onClick={shareLink}
      >
        <p>Share</p>
        <TbShare3 className="text-xl" />
      </button>
      <button
        className="px-4 py-3 hover:bg-neutral-100 text-start duration-300 flex items-center space-x-2 text-red-500"
        onClick={() => {
          setEditModal(false);
          setDeleteModal(true);
        }}
      >
        <p>Delete</p>
        <TbTrash className="text-xl" />
      </button>
    </div>
  );
};

export default EditModal;
