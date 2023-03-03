import Layout from "@/components/Layout";
import ProfileCard from "@/components/ProfileCard";
import ProfilePostSection from "@/components/ProfilePostSection";
import { getUser } from "@/modules/users/api";
import { useSession } from "next-auth/react";
import { Container } from "react-bootstrap";

const Profile = ({user}) => {
    const title = `${user.name}'s Profile`
    const session = useSession() 
    let notSelf = false
    if(user.id != session.data.user.id){
        notSelf = true
    }
    return (
        <Layout title={title}>
            <Container className="px-0 py-5">
                <div className="mx-auto w-75 py-3">
                    {notSelf ? <ProfileCard user={user} showUpdateOption={false}/> : <ProfileCard user={user}/>}
                </div>
                <hr></hr>
                {notSelf ? <ProfilePostSection user={user} showActions={false}/> : <ProfilePostSection user={user}/>}
            </Container>
        </Layout>
    )
}

Profile.auth = true
export default Profile; 

export async function getServerSideProps({params}){
    const user = await getUser(params.userId).then(res => res.data)
    if(!user) return{
        notFound: true
    }
    return {
        props: {
            user: user.data ?? []
        }
    }
}