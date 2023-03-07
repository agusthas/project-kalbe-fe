import Link from "next/link"
import parser from "html-react-parser"
import { formatDate } from "@/lib/date"
import { useEffect, useState } from "react"
import ImageWithFallback from "./ImageWithFallback"
import { ChatLeft, PencilSquare, Trash } from "react-bootstrap-icons"
import { Button, Form } from "react-bootstrap"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { deletePost } from "@/modules/posts/api"

export default function PostCard({post, profile = false, showActions = false, authorized = false, showComments = false}){
    const [dateString, setDateString] = useState("")
    useEffect(() => setDateString(formatDate(new Date(post.createdAt))),[])

    const session = useSession()
    const router = useRouter()
    
    const deleteHandler = (e) => {
        e.preventDefault()
        deletePost(post.id, session.data.accessToken).then((response) => {
            console.log(response)
            router.reload()
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

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
            {profile ?
                <div class="py-3 h-100 d-flex flex-column align-items-start">
                    <h5 class="card-title fw-bold flex-grow-1 mb-1">{post.title}</h5>
                    <div className="d-flex justify-content-between w-100">
                        <p className="card-text mb-2">{formatDate(new Date(post.createdAt))}</p>
                        <p>{post.comments.length} <ChatLeft /></p>
                    </div>
                    <p class="card-text mb-2 line-clamp-2 text-muted">{parser(post.description)}</p>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <p className="badge py-2 px-3 rounded-pill bg-dark text-white mb-0">{post.category.name}</p>
                        {showActions &&
                            <div className="d-flex justify-content-between align-items-center">
                                <Link href={`/posts/update/${post.id}`}>
                                    <h4 className="text-primary"><PencilSquare /></h4> 
                                </Link>
                                <Form onSubmit={deleteHandler}>
                                    <Button type="submit" style={{backgroundColor: 'transparent', border: 'none', outline: 'none'}}>
                                        <h4 className="text-danger"><Trash /></h4>
                                    </Button>
                                </Form>
                            </div>
                        }
                    </div>
                </div> :
                <div className="py-3 h-100 d-flex flex-column align-items-start">
                    <h5 className="card-title fw-bold flex-grow-1 mb-1">{post.title}</h5>
                    <div className="d-flex justify-content-between w-100">
                        <p className="card-text mb-2">by <span className="fw-semibold"><Link className="text-decoration-none text-dark" href={`/profile/view/${post.author.id}`}>{post.author.name}</Link></span></p>
                        <p className="card-text mb-2">{dateString}</p>
                    </div>
                    <p className="card-text mb-2 line-clamp-2 text-muted">{parser(post.description)}</p>
                    <p className="badge py-2 px-3 rounded-pill bg-dark text-white mb-0">{post.category.name}</p>
                </div>
            }
            
            <Link href={`/posts/${post.id}`} className="link-primary text-center w-100 fw-semibold">Read this blog</Link>
        </div>
    )
}