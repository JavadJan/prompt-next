"use client";

import { useEffect, useState } from "react";


import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";

const EditPrompt = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    
    console.log('searchParams:', promptId)
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    const UpdatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!promptId) {
            return alert("promptId not found!")
        }
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

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)

            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getDetails()

    }, [promptId])
    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={UpdatePrompt}
        />
    );
};

export default EditPrompt;