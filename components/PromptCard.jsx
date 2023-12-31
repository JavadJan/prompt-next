"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

export const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("")
  const pathName = usePathname()
  const { data: session } = useSession()

  //copy to clipboard
  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000)
  }

  return (
    <div className='prompt_card'>
      <div className="flex justify between items-start gap-5">
        <div className="flex-1 flex justify-start gap-3 cursor-pointer items-center">
          <Image src={post?.creator.image} width={40} height={40} alt="creator" className="rounded-full object-contain" />

          <div className="flex flex-col">
            <h1 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h1>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>

        <div className="copy-btn" onClick={() => { handleCopy() }}>
          <Image src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} width={15} height={15} className="cursor-pointer" alt="copy icon" />
        </div>
      </div>
      <p className="my-4 text-sm font-satoshi text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => { handleTagClick && handleTagClick(post.tag) }}
      >{post.tag}</p>

      {session?.user.id === post.creator._id &&
        pathName === '/profile' && (
          <div className="mt-5 flex gap-5 border-t border-gray-100 pt-3 justify-center" >
            <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
            <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
          </div>
        )}
    </div>
  )
}

