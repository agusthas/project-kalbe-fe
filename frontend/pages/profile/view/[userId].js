import Layout from "@/components/Layout";
import ProfileCard from "@/components/ProfileCard";
import ProfilePostSection from "@/components/ProfilePostSection";
import { getPosts } from "@/modules/posts/api";
import { getUser } from "@/modules/users/api";
import { Container } from "react-bootstrap";

const Profile = ({user, posts}) => {
    return (
        <Layout>
            <Container className="px-0 py-5">
                <div className="mx-auto w-75 py-3">
                    <ProfileCard user={user} />
                </div>
                <hr></hr>
                <ProfilePostSection user={user} posts={posts} />
            </Container>
        </Layout>
    )
}

Profile.auth = true
export default Profile; 

export async function getServerSideProps({params}){
    const user = await getUser(params.userId).then(res => res.data)
    const posts = await getPosts().then(res => res.data)
    return {
        props: {
            user: user.data ?? [],
            posts: posts.data ?? []
        }
    }
}