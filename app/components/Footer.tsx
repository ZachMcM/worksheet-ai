import { TbCopyright, TbMail } from "react-icons/tb"

export default function Footer() {
  return (
    <div className="mt-14 mx-6 md:mx-20 p-4 md:p-8 border-t border-neutral-500 text-neutral-500 flex items-center justify-between text-xs">
      <p className="flex items-center"><TbCopyright className="text-lg mr-1"/> worksheetai 2023. All rights reserved.</p>
      <a href="mailto:zachmcmullen04@gmail.com?subject=worksheetai%20Feedback" className="flex items-center space-x-1 hover:opacity-80">
        <p>Email Feedback</p>
        <TbMail className="text-lg"/>
      </a>
    </div>
  )
}