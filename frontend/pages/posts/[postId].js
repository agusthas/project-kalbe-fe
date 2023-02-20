import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostDetail from "../components/PostDetail";

const Post = () => {
    const router = useRouter();
    const post = router.query.postId;
    return(
        <>
            <Navbar />
            <PostDetail title={post} caption={post} />
            <Footer />
        </>
    )
}

export default Post;