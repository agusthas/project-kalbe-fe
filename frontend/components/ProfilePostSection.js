import { Container } from "react-bootstrap"
import ProfilePostCard from "./ProfilePostCard"

export default function ProfilePostSection({user, posts}){
    const postsList =  posts.filter(post => post.author.id === user.id)

    return(
        <Container className="py-5 min-vh-100">
            <div className="row g-3">
                {postsList.map(post => (
                    <div className="col-lg-3 col-md-4 mb-3" key={post.id}>
                        <ProfilePostCard key={post.id} post={post}/>
                    </div>
                ))}
            </div>
        </Container>
    )
}