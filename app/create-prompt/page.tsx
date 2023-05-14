"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


export type IPostType = {
  prompt: string;
  tag: string;
};

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } :any = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<IPostType>({ prompt: "", tag: "" });

  const createPrompt = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(post)
    try {
      console.log(session)
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId:  session?.user?.id  , 
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
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;