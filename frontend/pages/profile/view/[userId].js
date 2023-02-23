import Layout from "@/components/Layout";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

const Profile = () => {
    const router = useRouter();
    const user = router.query.userId;
    const userData = getUserById(user)
    return (
        <Layout>
            <Container className="px-0 py-5">
                <h1>Profile</h1>
                <p>Name: {user.name}</p>
                
            </Container>
        </Layout>
    )
}

export default Profile; 

async function getUserById(id){
    const user = await fetch(`http://localhost:3001/users/${id}`)
    .then(res => res.json())
    .catch(error => console.log(error))
    return user?.data
}

export async function getStaticPaths(){
    return{
        paths: [
            {params: {userId: '1'}}
        ],
        fallback: false
    }
}

export async function getStaticProps(){
    const user = await getUserById() ?? []
    return {
        props: {
            user
        },
        revalidate: 30
    }
}