import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";
import ProfileCard from "@/components/ProfileCard";
import { getUser, updateMe } from "@/modules/users/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";

const UpdateProfile = ({user}) => {
    const router = useRouter()
    const {status, data:session} = useSession()

    const [avatar, setAvatar] = useState(user.avatar)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [phone, setPhone] = useState(user.phone)
    const [bio, setBio] = useState(user.bio)

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    const [confirmationPasswordAlert, setConfirmationPasswordAlert] = useState('')
    const [phoneAlert, setPhoneAlert] = useState('')
    const [bioAlert, setBioAlert] = useState('')

    if(status === 'loading'){
        return <LoadingScreen />
    }

    if(user.id != session.user.id) {
        router.push('/')
        return
    }

    const avatarChangeHandler = (e) => {
        setAvatar(e.target.value)
    }

    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }
    
    const confirmationPasswordChangeHandler = (e) => {
        setConfirmationPassword(e.target.value)
    }

    const phoneChangeHandler = (e) => {
        setPhone(e.target.value)
    }

    const bioChangeHandler = (e) => {
        setBio(e.target.value)
    }

    const updateHandler = (e) => {
        e.preventDefault()
        let error = 0
        if(name.length <= 0){
            setNameAlert('Name must be filled!')
            error = 1
        }else if(name.length > 50){
            setNameAlert('Name must not have more than 50 characters!')
            error = 1
        }else{
            setNameAlert('')
        }
        if(email.length <= 0){
            setEmailAlert('Email must be filled!')
            error = 1
        }else{
            setEmailAlert('')
        }
        if(password.length < 8){
            setPasswordAlert('Password must have at least 8 characters!')
            error = 1
        }else{
            setPasswordAlert('')
        }
        if(confirmationPassword != password){
            setConfirmationPasswordAlert('Confirmation password must match the password!')
            error = 1
        }else{
            setConfirmationPasswordAlert('')
        }
        if(phone.length < 10){
            setPhoneAlert('Phone must have at least 10 digits!')
            error = 1
        }else if(phone.length > 15){
            setPhoneAlert('Phone must not have more than 15 digits!')
            error = 1
        }else{
            setPhoneAlert('')
        }
        if(bio.length > 200){
            setBioAlert('Bio must not have more than 200 characters!')
            error = 1
        }else{
            setBioAlert('')
        }
        if(error == 1){
            console.log(error);
            return
        }
        const updatedUser = {
            avatar: avatar.length > 0 ? avatar : null,
            name: name,
            email: email,
            password: password,
            phone: phone,
            bio: bio
        }
        updateMe(updatedUser, session.accessToken).then((response) => {
            console.log(response)
            router.push('/')
        }).catch((err) => {
            console.log(err.response.data)
        }).finally(() => {
            setAvatar('')
            setName('')
            setEmail('')
            setPassword('')
            setConfirmationPassword('')
            setPhone('')
            setBio('')
        })
    }

    return (
        <Layout title="Update Profile">
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">Update Profile</h1>
                <Form.Group className="py-3 mx-auto w-75">
                    <Form.Label>Banner Preview</Form.Label>
                    <div className="border border-2 rounded-3 p-3">
                        <ProfileCard user={user}/>
                    </div>
                </Form.Group>
                <Form className="w-50 mx-auto py-3" onSubmit={updateHandler}>
                <Form.Group className="py-3">
                        <Form.Label htmlFor="avatar" className="w-25">Profile Picture URL</Form.Label>
                        <Form.Control onChange={avatarChangeHandler} id="avatar" name="avatar" type="text" value={avatar}/>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="name" className="w-25">Name</Form.Label>
                        <Form.Control onChange={nameChangeHandler} id="name" name="name" type="text" value={name}/>
                    </Form.Group>
                    {nameAlert && <p id="title" className="d-flex flex-column text-center text-danger p-2 m-1" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{nameAlert}</p>}
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="email" className="w-25">Email</Form.Label>
                        <Form.Control onChange={emailChangeHandler} id="email" name="email" type="email" value={email}/>
                    </Form.Group>
                    {emailAlert && <p id="title" className="d-flex flex-column text-center text-danger p-2 m-1" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{emailAlert}</p>}
                    <div className="d-flex justify-content-between">
                        <Form.Group className="py-3 w-50">
                            <Form.Label htmlFor="password" className="w-50">Password</Form.Label>
                            <Form.Control onChange={passwordChangeHandler} id="password" name="password" type="password" value={password}/>
                        </Form.Group>
                        {passwordAlert && <p id="title" className="w-50 d-flex flex-column text-center text-danger p-2 m-1" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{passwordAlert}</p>}
                        <Form.Group className="py-3 w-50 mx-2">
                            <Form.Label htmlFor="password_confirmation" className="w-50">Confirm Password</Form.Label>
                            <Form.Control onChange={confirmationPasswordChangeHandler} id="password_confirmation" name="password_confirmation" type="password" value={confirmationPassword}/>
                        </Form.Group>
                        {confirmationPasswordAlert && <p id="title" className="w-50 d-flex flex-column text-center text-danger p-2 m-1" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{confirmationPasswordAlert}</p>}
                    </div>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="phone" className="w-25">Phone Number</Form.Label>
                        <Form.Control onChange={phoneChangeHandler} id="phone" name="phone" type="number" value={phone}/>
                    </Form.Group>
                    {phoneAlert && <p id="title" className="d-flex flex-column text-center text-danger p-2 m-1" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{phoneAlert}</p>}
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="bio" className="w-25">Bio</Form.Label>
                        <Form.Control onChange={bioChangeHandler} id="bio" name="bio" as="textarea" rows={5} className="mt-1 mb-3" value={bio} />
                    </Form.Group>
                    {bioAlert && <p id="title" className="d-flex flex-column text-center text-danger p-2 mb-4" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{bioAlert}</p>}
                    <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-between w-25">
                            <Link href={`/`}>
                                <Button className="btn text-white btn-danger fw-bold">Cancel</Button>
                            </Link>
                            <Button className="btn btn-primary fw-bold" type="submit">Update</Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </Layout>
    )
}

UpdateProfile.auth = true
export default UpdateProfile;

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