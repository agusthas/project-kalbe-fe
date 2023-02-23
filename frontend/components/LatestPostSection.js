import { Container } from "react-bootstrap"
import LatestPostCard from "./LatestPostCard"

export default function LatestPostSection({latestPosts}){
    return(
        <Container className="py-5">
            <div className="row mb-5">
                <div className="col text-center">
                    <h2 className="fw-bold">Latest Blogs</h2>
                </div>
            </div>
            <div className="row">
                {latestPosts.map(post => (
                    <div className="col-md-4">
                        <LatestPostCard post={post} key={post.id}/>
                    </div>
                ))}
            </div>
        </Container>
    )
}