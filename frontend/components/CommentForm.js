import ImageWithFallback from "./ImageWithFallback"
import { Button } from "react-bootstrap"
import { useState } from "react"
import { createComment } from "@/modules/comments/api"
import { useRouter } from "next/router"
import Image from "next/image"

export default function CommentForm({user, token, postId}){
    const [comment, setComment] = useState("")
    const router = useRouter()
    const submitHandler = async(e) => {
        e.preventDefault()
        if(comment.length === 0) return
        await createComment(
            postId,
            {
                content: comment
            },
            token
        )
        router.reload(router.pathname)
    }
    return(
        <div className="card mb-3">
            <div className="card-body d-flex gap-3">
                {user.avatar === null ?
                    <Image src={"/images/profile-picture-placeholder.jpg"} alt={user.name} className="rounded-circle border border-secondary" width={64} height={64} /> :
                    <Image src={user.avatar} alt={user.name} className="rounded-circle border border-secondary" width={64} height={64} />
                }
                <form className="d-flex flex-column align-items-end w-100" action="POST" onSubmit={submitHandler}>
                    <textarea 
                        className="form-control mb-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment here.."
                        style={{resize: 'none', background: '#EDEDF3'}}
                        rows='4'
                    />
                    <Button variant="primary" type="submit" className="col-3">Send</Button>
                </form>
            </div>
        </div>
    )
}