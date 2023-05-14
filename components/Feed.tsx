"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick } :any) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post :any) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};



const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");

  useEffect(() => { 
    const fetchPost =  async () =>{
      const res = await fetch('/api/prompt');
      const data = await res.json()

      setAllPosts(data)

    }

    fetchPost()
  }, []);


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          // onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={allPosts}
          // handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} 
        // handleTagClick={handleTagClick} 
        />
      )}
    </section>
  );
}

export default Feed
