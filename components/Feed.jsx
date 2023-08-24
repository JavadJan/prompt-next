"use client"
import React, { useEffect, useState } from 'react'
import { PromptCard } from './PromptCard'
// import { PromptCard } from './PromptCard'

const PromptCardLists = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data && data.map((post) =>
      (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      )
      )}

    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = async (e) => {
    e.preventDefault()

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          value={searchText}
          placeholder='search for a tag or a username'
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* <PromptCardLists
        data={posts}
        handleTagClick={() => { }}
      /> */}
      <PromptCardLists data={posts}
        handleTagClick={() => { }} />
    </section>
  )
}

export default Feed