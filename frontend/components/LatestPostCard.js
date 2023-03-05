import ImageWithFallback from "./ImageWithFallback"
import Link from "next/link"
import parser from "html-react-parser"
import { formatDate } from "@/lib/date"
import { useEffect, useState } from "react"

export default function LatestPostCard({post}){
    const [dateString, setDateString] = useState("")
    useEffect(() => setDateString(formatDate(new Date(post.createdAt))),[])
    return(
        <div className="card h-100 d-flex flex-column justify-content-between" style={{border: 'none'}}>
            <div style={{width: '100%', aspectRatio: '16 / 9', position: 'relative'}}>
                <ImageWithFallback 
                    src={post.image}
                    fallbackSrc={"/images/no-image.png"}
                    fill 
                    style={{aspectRatio: '16 / 9', objectFit: 'cover'}}
                    className="position-relative rounded shadow-sm"
                    alt="Post Image"
                />
            </div>
            <div className="py-3 h-100 d-flex flex-column align-items-start">
                <h5 className="card-title fw-bold flex-grow-1 mb-1">{post.title}</h5>
                <div className="d-flex justify-content-between w-100">
                    <p className="card-text mb-2">by <span className="fw-semibold"><Link className="text-decoration-none text-dark" href={`/profile/view/${post.author.id}`}>{post.author.name}</Link></span></p>
                    <p className="card-text mb-2">{dateString}</p>
                </div>
                <p className="card-text line-clamp-4 text-muted mb-2">{parser(post.description)}</p>
                <p className="badge py-2 px-3 rounded-pill bg-dark text-white mb-2">{post.category.name}</p>
            </div>
            <Link href={`/posts/${post.id}`} className="btn btn-outline-primary w-100 fw-semibold">Read Blog</Link>
        </div>
    )
}