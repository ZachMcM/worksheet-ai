import { Worksheet } from "@prisma/client"
import Link from "next/link"
import { TbAtom, TbBooks, TbBuildingBank, TbMathIntegralX, TbSchool } from "react-icons/tb"

const WorksheetCard = ({ worksheet }: { worksheet: Worksheet }) => {
  const getTimeDifference = (): string => {
    const currentDate = new Date()
    const createdDate = new Date(worksheet.createdAt)
    const differenceInTime = currentDate.getTime() - createdDate.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)
    if (differenceInDays < 1) {
      return Math.round(differenceInDays * 24) + "h ago"
    }
    return Math.round(differenceInDays) + "d ago"
  }

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

    if (mathSubjects.includes(worksheet.subject)) {
      return <TbMathIntegralX className="text-3xl"/>
    }
    if (englishSubjects.includes(worksheet.subject)) {
      return <TbBooks className="text-3xl"/>
    }
    if (scienceSubjects.includes(worksheet.subject)) {
      return <TbAtom className="text-3xl"/>
    }
    if (socialStudiesSubjects.includes(worksheet.subject)) {
      return <TbBuildingBank className="text-3xl"/>
    }
    return <TbSchool className="text-3xl"/>
  }

  return (
    <Link href={`/user/worksheet/${worksheet.id}`} className="hover:border-white duration-300 rounded-md border border-neutral-500 bg-black w-full p-8 flex flex-col space-y-5">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-3 items-center">
          {getIcon()}
          <h3 className="text-2xl font-semibold">{worksheet.title}</h3>
        </div>
        <p className="text-neutral-500">{getTimeDifference()}</p>
      </div>
      <div className="flex space-x-3 items-center text-xs font-medium">
        <div className="py-2 px-3 rounded-md text-neutral-500 border border-neutral-500">{worksheet.subject}</div>
        <div className="py-2 px-3 rounded-md text-neutral-500 border border-neutral-500">{worksheet.topic}</div>
      </div>
    </Link>
  )
}

export default WorksheetCard