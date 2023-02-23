import Layout from "@/components/Layout";
import Link from "next/link";
import { Button, Container, Form, Image } from "react-bootstrap";

const UpdateProfile = () => {
    return (
        <Layout>
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">Update Profile</h1>
                <Form className="w-50 mx-auto py-3" action="/" method="POST">
                    <Form.Group className="py-3">
                        <Form.Label className="w-50">Banner Preview</Form.Label>
                        <div className="d-flex p-3 justify-content-between align-items-center w-100 border border-secondary rounded-3">
                            <div className="w-25">
                                <Image src="https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516__340.jpg" alt="title" className="rounded-circle w-100" />
                            </div>
                            <div className="d-flex flex-column w-75 mx-5">
                                <h3 className="fw-bold">Name</h3>
                                <p className="mb-2">Email</p>
                                <p className="mb-2">Bio</p>
                                <p className="mb-2 fw-bold">Posts | Comments</p>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label className="w-25">Name</Form.Label>
                        <Form.Control required type="name"/>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label className="w-25">Email</Form.Label>
                        <Form.Control required type="text"/>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Form.Group className="py-3 w-50">
                            <Form.Label className="w-50">Password</Form.Label>
                            <Form.Control required type="password"/>
                        </Form.Group>
                        <Form.Group className="py-3 w-50">
                            <Form.Label className="w-50">Confirm Password</Form.Label>
                            <Form.Control required type="password" />
                        </Form.Group>
                    </div>
                    <Form.Group className="py-3">
                        <Form.Label className="w-25">Phone Number</Form.Label>
                        <Form.Control required type="number"/>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label className="w-25">Bio</Form.Label>
                        <Form.Control required as="textarea" rows={5} className="my-3" />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-between w-25">
                            <Link href={`/`}>
                                <Button className="btn text-white btn-danger fw-bold">Cancel</Button>
                            </Link>
                            <Link href={`/`}>
                                <Button className="btn btn-primary fw-bold" type="submit">Update</Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </Container>
        </Layout>
    )
}

export default UpdateProfile;