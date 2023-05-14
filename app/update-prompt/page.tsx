"use client";

import { useState,useEffect } from "react";
import { useRouter ,useSearchParams} from "next/navigation";
import Form from "@components/Form";


export type IPostType = {
  prompt: string;
  tag: string;
};

const EditPrompt = () => {
  const router = useRouter();
  const searchParams :any = useSearchParams();
  const promptId = searchParams.get('id')

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<IPostType>({ prompt: "", tag: "" });


  useEffect(() =>{
    const getPromptDetails = async () => {
        const res = await fetch(`api/prompt/${promptId}`)
        const data = await res.json()
        setPost({
            prompt : data.prompt,
            tag: data.tag
        })

    } 
    if(promptId){
        getPromptDetails()
    }


  },[promptId])

  const updatePrompt = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!promptId) return alert('No Prompt Id')

    try {
      
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;