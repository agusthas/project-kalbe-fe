import ImageWithFallback from "./ImageWithFallback";
import { formatDate } from "@/lib/date";
import { useEffect, useState } from "react";

export default function CommentCard({comment}){
    const [dateString, setDateString] = useState("")
    useEffect(() => {
        setDateString(formatDate(new Date(comment.createdAt)))
    },[])
    return(
        <div className="card mb-3">
            <div className="card-body d-flex gap-3">
                <ImageWithFallback
                    src={comment.author.avatar}
                    fallbackSrc={"/images/no-image.png"}
                    className="rounded-circle border border-secondary"
                    width={64}
                    height={64}
                />
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title fw-semibold">{comment.author.name}</h5>
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