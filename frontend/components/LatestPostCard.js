import Image from "next/image"
import parser from "html-react-parser"
import { formatDate } from "@/lib/date"

export default function LatestPostCard({post}){
    return(
        <div class="card h-100 d-flex flex-column justify-content-between" style={{border: 'none'}}>
            <Image src={post.image} fill style={{aspectRatio: '16 / 9', objectFit: 'cover'}} class="position-relative rounded shadow-sm" alt="Post Image"/>
            <div class="p-3 h-100 d-flex flex-column">
                <h5 class="card-title fw-bold flex-grow-1">{post.title}</h5>
                <div className="d-flex justify-content-between">
                    <p className="card-text">by <span className="fw-semibold">{post.author.name}</span></p>
                    <p className="card-text">{formatDate(new Date(post.createdAt))}</p>
                </div>
                <p class="card-text line-clamp-4 text-muted">{parser(post.description)}</p>
            </div>
            <a href={`/posts/${post.id}`} class="btn btn-outline-primary w-100">Read Blog</a>
        </div>
    )
}