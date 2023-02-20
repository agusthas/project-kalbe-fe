import { Container } from "react-bootstrap";

const PostDetail = (post) => {
    return (
        <Container className="py-5 w-75">
            <h1>{post.title}</h1>
            <p>{post.caption}</p>
        </Container>
    )
}

export default PostDetail;