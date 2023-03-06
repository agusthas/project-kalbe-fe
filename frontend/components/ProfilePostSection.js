import Link from "next/link"
import { Button, Container } from "react-bootstrap"
import PostCard from "./PostCard"

export default function ProfilePostSection({user, showActions}){
    if(user.posts.length <= 0) return(
        <Container className="py-5">
            <div className="text-center">
                <h1 className="fw-bold">You have not posted anything here yet.</h1> 
                <h5>Maybe try to post one first?</h5>
                <Link href={`/posts/create`}>
                    <Button variant="primary" className="fw-bold mt-2">Create Post</Button>
                </Link>
            </div> 
        </Container>
    )
    else return(
        <Container className="py-5 min-vh-100">
            <div className="row g-3">
                {user.posts.map(post => (
                    <div className="col-lg-3 col-md-4 mb-3" key={post.id}>
                        <PostCard profile={true} key={post.id} post={post} showActions={showActions}/>
                    </div>
                ))}
            </div>
        </Container>
    )
}