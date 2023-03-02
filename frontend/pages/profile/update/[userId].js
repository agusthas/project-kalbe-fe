import Layout from "@/components/Layout";
import ProfileCard from "@/components/ProfileCard";
import { getUser } from "@/modules/users/api";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";

const UpdateProfile = ({user}) => {
    const [avatar, setAvatar] = useState(user.avatar)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    const [phone, setPhone] = useState(user.phone)
    const [bio, setBio] = useState(user.bio)

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
        setImage('')
        setName('')
        setEmail('')
        setPassword('')
        setConfirmationPassword('')
        setPhone('')
        setBio('')
    }

    return (
        <Layout>
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">Update Profile</h1>
                <Form.Group className="py-3 mx-auto w-75">
                    <Form.Label>Banner Preview</Form.Label>
                    <div className="border border-2 rounded-3 p-3">
                        <ProfileCard user={user} />
                    </div>
                </Form.Group>
                <Form className="w-50 mx-auto py-3" action="/" method="POST">
                <Form.Group className="py-3">
                        <Form.Label htmlFor="avatar" className="w-25">Profile Picture URL</Form.Label>
                        <Form.Control onChange={avatarChangeHandler} required id="avatar" name="avatar" type="text" value={avatar}/>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="name" className="w-25">Name</Form.Label>
                        <Form.Control onChange={nameChangeHandler} required id="name" name="name" type="text" value={name}/>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="email" className="w-25">Email</Form.Label>
                        <Form.Control onChange={emailChangeHandler} required id="email" name="email" type="email" value={email}/>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Form.Group className="py-3 w-50">
                            <Form.Label htmlFor="password" className="w-50">Password</Form.Label>
                            <Form.Control onChange={passwordChangeHandler} required id="password" name="password" type="password" value={password}/>
                        </Form.Group>
                        <Form.Group className="py-3 w-50 mx-2">
                            <Form.Label htmlFor="password_confirmation" className="w-50">Confirm Password</Form.Label>
                            <Form.Control onChange={confirmationPasswordChangeHandler} required id="password_confirmation" name="password_confirmation" type="password" value={confirmationPassword}/>
                        </Form.Group>
                    </div>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="phone" className="w-25">Phone Number</Form.Label>
                        <Form.Control onChange={phoneChangeHandler} required id="phone" name="phone" type="number" value={phone}/>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="bio" className="w-25">Bio</Form.Label>
                        <Form.Control onChange={bioChangeHandler} required id="bio" name="bio" as="textarea" rows={5} className="mt-1 mb-3" value={bio} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-between w-25">
                            <Link href={`/`}>
                                <Button className="btn text-white btn-danger fw-bold">Cancel</Button>
                            </Link>
                            <Link href={`/`}>
                                <Button onClick={updateHandler} className="btn btn-primary fw-bold" type="submit">Update</Button>
                            </Link>
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
    return {
        props: {
            user: user.data ?? []
        }
    }
}