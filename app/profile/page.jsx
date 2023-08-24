"use client"
import { Profile } from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const MyProfile = () => {
    const router = useRouter()


    const { data: session } = useSession()
    console.log("session:", session && session.user.email)

    const [posts, setPosts] = useState([])


    useEffect(() => {
        const useFetch = async () => {
            const response = await fetch(`/api/user/${session?.user.id}/post`)
            const data = await response.json()
            setPosts(data)
            console.log('render useEffect')
        }
        if (session?.user.id) useFetch();
    }, [session?.user.id ]);



    const handleEdit = async (post) => {
        console.log('to navigate')
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

        if (hasConfirmed) {
            try {

                await fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE"
                })

                const filteredPosts = posts.filter((post) => {
                    post._id !== post._id
                })
                setPosts(filteredPosts)
                router.push("/");
            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <Profile
            name="My"
            desc="welcome to your personalized profile page"
            data={posts}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    )
}

export default MyProfile