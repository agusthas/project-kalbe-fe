import Image from "next/image"
import parser from "html-react-parser"
import { formatDate } from "@/lib/date"

export default function PostCard({post, authorized = false, showComments = false}){
    return(
        <div class="card h-100 d-flex flex-column justify-content-between" style={{border: 'none'}}>
            <div style={{width: '100%', aspectRatio: '16 / 9', position: 'relative'}}>
                <Image src={post.image} fill style={{aspectRatio: '16 / 9', objectFit: 'cover'}} class="position-relative rounded shadow-sm" alt="Post Image"/>
            </div>
            <div class="py-3 h-100 d-flex flex-column align-items-start">
                <h5 class="card-title fw-bold flex-grow-1 mb-1">{post.title}</h5>
                <div className="d-flex justify-content-between w-100">
                    <p className="card-text mb-2">by <span className="fw-semibold">{post.author.name}</span></p>
                    <p className="card-text mb-2">{formatDate(new Date(post.createdAt))}</p>
                </div>
                <p class="card-text mb-2 line-clamp-2 text-muted">{parser(post.description)}</p>
                <p className="badge py-2 px-3 rounded-pill bg-dark text-white mb-0">{post.category.name}</p>
            </div>
            <a href={`/posts/${post.id}`} class="link-primary text-center w-100 fw-semibold">Read this post</a>
        </div>
    )
}