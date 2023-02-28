import { Container } from "react-bootstrap"
import LatestPostCard from "./LatestPostCard"

export default function LatestPostSection({latestPosts}){
    return(
        <Container className="py-5" id="post-section">
            <div className="row mb-4">
                <div className="col text-center">
                    <h2 className="fw-bold">Latest Blogs</h2>
                </div>
            </div>
            <div className="row g-3 justify-content-center">
                {latestPosts.map(post => (
                    <div className="col-lg-4 col-md-6 mb-3" key={post.id}>
                        <LatestPostCard post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    )
}