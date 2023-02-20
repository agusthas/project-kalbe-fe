import { Container } from "react-bootstrap";
import PostCard from "./PostCard";

const Landing = () => {
    return (
        <Container className="py-5 w-75">
            <h1>My Blog</h1>
            <hr />
            <PostCard thumbnail="1" title="Test 1" caption="Test 1" />
            <PostCard thumbnail="2" title="Test 2" caption="Test 2" />
        </Container>
    )
}

export default Landing;