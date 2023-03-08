import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";
import ProfileCard from "@/components/ProfileCard";
import ProfilePostSection from "@/components/ProfilePostSection";
import { getUser } from "@/modules/users/api";
import { useSession } from "next-auth/react";
import { Container } from "react-bootstrap";

const Profile = ({user}) => {
    const title = `${user.name}'s Profile`
    const {status, data:session} = useSession() 
    let notSelf = false
    if(status !== 'authenticated' || user.id != session.user.id){
        notSelf = true
    }
    if(status === 'loading'){
        return <LoadingScreen />
    }
    return (
        <Layout title={title}>
            <Container className="px-0 py-5">
                <div className="mx-auto w-75 py-3">
                    {notSelf ? <ProfileCard user={user}/> : <ProfileCard user={user} showUpdateOption={true}/>}
                </div>
                <hr></hr>
                {notSelf ? <ProfilePostSection user={user}/> : <ProfilePostSection user={user} showActions={true}/>}
            </Container>
        </Layout>
    )
}

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