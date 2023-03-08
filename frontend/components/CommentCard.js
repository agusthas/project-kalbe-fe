import ImageWithFallback from "./ImageWithFallback";
import { formatDate } from "@/lib/date";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { deleteComment } from "@/modules/comments/api";
import { useRouter } from "next/router";

export default function CommentCard({comment, showDelete = false, token = null}){
    const [dateString, setDateString] = useState("")
    const router = useRouter()
    useEffect(() => {
        setDateString(formatDate(new Date(comment.createdAt)))
    },[])
    const handleDeleteComment = async() => {
        await deleteComment(comment.postId, comment.id, token)
        router.reload(router.pathname)
    }
    return(
        <div className="card mb-3">
            <div className="card-body d-flex gap-3">
                <ImageWithFallback
                    src={comment.author.avatar}
                    fallbackSrc={"/images/profile-picture-placeholder.jpg"}
                    width={64}
                    height={64}
                    style={{objectFit: 'cover'}} 
                    class="rounded-circle border border-secondary" 
                    alt={comment.author.name}
                />
                <div className="d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link className="text-dark text-decoration-none" href={`/profile/view/${comment.author.id}`}>
                            <h5 className="card-title fw-semibold mb-0">{comment.author.name}</h5>
                        </Link>
                        <p className="card-text">{dateString}</p>
                    </div>
                    <p className="text-muted text-break" style={{textAlign: 'justify'}}>
                        {comment.content}
                    </p>
                    <div className="d-flex justify-content-end">
                        {showDelete ? <Button variant="danger" className="text-white d-flex justify-content-center align-items-center gap-2" onClick={handleDeleteComment}><span>Delete</span><Trash3Fill/></Button>: ""}
                    </div>
                </div>
            </div>
        </div>
    )
}