import ImageWithFallback from "./ImageWithFallback";
import { formatDate } from "@/lib/date";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CommentCard({comment}){
    const [dateString, setDateString] = useState("")
    useEffect(() => {
        setDateString(formatDate(new Date(comment.createdAt)))
    },[])
    return(
        <div className="card mb-3">
            <div className="card-body d-flex gap-3">
                {comment.author.avatar === null ?
                    <Image src={"/images/profile-picture-placeholder.jpg"} alt={comment.author.name} className="rounded-circle border border-secondary" width={64} height={64} /> :
                    <Image src={comment.author.avatar} alt={comment.author.name} className="rounded-circle border border-secondary" width={64} height={64} />
                }
                <div className="d-flex flex-column w-100">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="card-title fw-semibold mb-0">{comment.author.name}</h5>
                        <p className="card-text">{dateString}</p>
                    </div>
                    <p className="card-text text-muted" style={{textAlign: 'justify'}}>
                        {comment.content}
                    </p>
                </div>
            </div>
        </div>
    )
}