import ImageWithFallback from "@/components/ImageWithFallback";
import Layout from "@/components/Layout";
import { formatDate } from "@/lib/date";
import { getPost } from "@/modules/posts/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-bootstrap-icons";
import AnchorLink from "next/link";
import parser from "html-react-parser"
import { ArrowLeft, ChatLeft } from "react-bootstrap-icons";
import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";

export default function Post({post}){
    const [dateString, setDateString] = useState("")
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const {asPath} = useRouter()
    const { status, data: session } = useSession()
    useEffect(() => setDateString(formatDate(new Date(post.createdAt),options)),[])
    if(status === 'loading'){
        return <LoadingScreen/>
    }
    return(
        <Layout showNavbar={false}>
            <Container className="py-5">
            <AnchorLink href={"/"} className="d-flex gap-2 align-items-center position-absolute top-0 left-0 mt-4"><ArrowLeft/><span>Back to Home</span></AnchorLink>
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8 text-center">
                        <div className="display-6 fw-bold mb-2">{post.title}</div>
                        <div className="date">Published {dateString}</div>
                    </div>
                </div>
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8">
                        <ImageWithFallback  
                            src={post.image} 
                            fallbackSrc={"/images/no-image.png"} 
                            fill 
                            style={{aspectRatio: '16 / 9', objectFit: 'cover'}} 
                            className="position-relative rounded-3"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="d-flex md justify-content-between align-items-center mt-3">
                            <p className="badge py-2 px-3 rounded-pill bg-dark text-white mb-0 fs-6">{post.category.name}</p>
                            <div className="d-flex align-items-center gap-2">
                                <ImageWithFallback
                                    src={post.author.avatar}
                                    fallbackSrc={"/images/no-image.png"}
                                    width={40}
                                    height={40}
                                    className="rounded-circle border border-secondary"
                                    style={{objectFit: 'cover'}}
                                />
                                <p className="mb-0">{post.author.name}</p>
                            </div>
                            <button className="btn btn-primary rounded-pill d-flex align-items-center gap-2" onClick={async() => await navigator.share({url: `http://localhost:3000${asPath}`})}><Link size={24}/><span>Share</span></button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-5">
                    <div className="col" style={{textAlign: 'justify'}}>
                        {parser(post.description,{
                            replace: domNode => {
                                if(domNode.type === 'text') return <p className="mb-0">{domNode.data}</p>
                            }
                        })}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex align-items-center gap-3">
                            <h3 className="fw-bold mb-0">Comments</h3>
                            <div className="d-flex align-items-center gap-2">
                                <span>{post.comments.length}</span><ChatLeft/>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="col-md-8">
                        {status === 'authenticated' ? <CommentForm user={session.user} token={session.accessToken} postId={post.id}/> : ""}
                        {post.comments.map(comment => (
                            <CommentCard comment={comment} key={comment.id}/>
                        ))}
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps({params}){
    const post = await getPost(params.postId).then(res => res.data)

    if(!post) return{
        notFound: true
    }

    return {
        props:{
            post: post.data
        }
    }
}