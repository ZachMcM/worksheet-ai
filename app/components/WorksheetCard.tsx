"use client";

import { Worksheet } from "@prisma/client";
import Link from "next/link";
import {
  TbAtom,
  TbBooks,
  TbBuildingBank,
  TbCode,
  TbDots,
  TbDotsVertical,
  TbMathIntegralX,
  TbSchool,
} from "react-icons/tb";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import RenameModal from "./RenameModal";
import { Dispatch, SetStateAction, useState } from "react";

const WorksheetCard = ({
  worksheet,
  setUpdateCount,
  updateCount,
}: {
  worksheet: Worksheet;
  setUpdateCount: Dispatch<SetStateAction<number>>;
  updateCount: number;
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

  const getIcon = () => {
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
      "Web Development",
    ];

    if (mathSubjects.includes(worksheet.subject)) {
      return <TbMathIntegralX className="text-3xl" />;
    }
    if (englishSubjects.includes(worksheet.subject)) {
      return <TbBooks className="text-3xl" />;
    }
    if (scienceSubjects.includes(worksheet.subject)) {
      return <TbAtom className="text-3xl" />;
    }
    if (socialStudiesSubjects.includes(worksheet.subject)) {
      return <TbBuildingBank className="text-3xl" />;
    }
    if (csSubjects.includes(worksheet.subject)) {
      return <TbCode className="text-3xl" />;
    }
    return <TbSchool className="text-3xl" />;
  };

  return (
    <div className="hover:border-white duration-300 rounded-md border border-neutral-500 bg-black w-full p-8 flex flex-col space-y-5">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-3 items-center">
          {getIcon()}
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
          setRenameModal={setRenameModal}
          worksheet={worksheet}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      )}
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          worksheet={worksheet}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
        />
      )}
    </div>
  );
};

export default WorksheetCard;
