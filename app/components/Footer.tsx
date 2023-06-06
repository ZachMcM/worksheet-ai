import { TbCopyright, TbMail } from "react-icons/tb"

export default function Footer() {
  return (
    <div className="mt-32 mx-6 md:mx-20 p-4 md:p-8 border-t border-neutral-500 text-neutral-500 flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:justify-between text-xs">
      <p className="flex items-center"><TbCopyright className="text-lg mr-1"/> worksheetai 2023. All rights reserved.</p>
      <a href="mailto:zachmcmullen04@gmail.com?subject=worksheetai%20Feedback" className="flex items-center space-x-1 hover:opacity-80">
        <TbMail className="text-lg"/>
        <p>Email Feedback</p>
      </a>
    </div>
  )
}