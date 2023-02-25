import Image from "next/image"
import parser from "html-react-parser"
import { formatDate } from "@/lib/date"
import { useEffect, useState } from "react"

export default function LatestPostCard({post}){
    const [dateString, setDateString] = useState("")
    useEffect(() => setDateString(formatDate(new Date(post.createdAt))),[])
    return(
        <div class="card h-100 d-flex flex-column justify-content-between" style={{border: 'none'}}>
            <div style={{width: '100%', aspectRatio: '16 / 9', position: 'relative'}}>
                <Image src={post.image} fill style={{aspectRatio: '16 / 9', objectFit: 'cover'}} class="position-relative rounded shadow-sm" alt="Post Image"/>
            </div>
            <div class="py-3 h-100 d-flex flex-column align-items-start">
                <h5 class="card-title fw-bold flex-grow-1 mb-1">{post.title}</h5>
                <div className="d-flex justify-content-between w-100">
                    <p className="card-text mb-2">by <span className="fw-semibold">{post.author.name}</span></p>
                    <p className="card-text mb-2">{dateString}</p>
                </div>
                <p class="card-text line-clamp-4 text-muted mb-2">{parser(post.description)}</p>
                <p className="badge py-2 px-3 rounded-pill bg-dark text-white mb-2">{post.category.name}</p>
            </div>
            <a href={`/posts/${post.id}`} class="btn btn-outline-primary w-100 fw-semibold">Read Blog</a>
        </div>
    )
}