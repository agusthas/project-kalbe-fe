import { useRouter } from "next/router";
import PostDetail from "../components/PostDetail";
import Layout from "@/components/Layout";

const Post = () => {
    const router = useRouter();
    const post = router.query.postId;
    return(
        <Layout showNavbar={false}>
            <PostDetail title={post} caption={post} />
        </Layout>
    )
}

export default Post;