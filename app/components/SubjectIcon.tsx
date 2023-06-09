import { TbAtom, TbBooks, TbBuildingBank, TbCode, TbMathIntegralX, TbSchool } from "react-icons/tb"

const SubjectIcon = ({ subject }: { subject: string }) => {
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
    "english Language",
    "english literature",
    "english phonetics",
  ];
  const csSubjects: string[] = [
    "computer science",
    "operating systems",
    "object oriented programming",
    "data structures and algorithms",
    "theory of computation",
    "web development"
  ]

  if (mathSubjects.includes(subject)) {
    return <TbMathIntegralX/>
  }
  if (englishSubjects.includes(subject)) {
    return <TbBooks/>
  }
  if (scienceSubjects.includes(subject)) {
    return <TbAtom/>
  }
  if (socialStudiesSubjects.includes(subject)) {
    return <TbBuildingBank/>
  }
  if (csSubjects.includes(subject)) {
    return <TbCode/>
  }
  return <TbSchool/>
}

export default SubjectIcon