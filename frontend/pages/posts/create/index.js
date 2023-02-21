import Navbar from "@/pages/components/Navbar";
import Link from "next/link";
import { Button, Container, Form } from "react-bootstrap";

const CreatePost = () => {
    return(
        <>
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">Create Blog</h1>
                <Form className="w-50 mx-auto py-3" action="/" method="POST">
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label className="w-25">Image</Form.Label>
                        <Form.Control type="file" className="w-75" />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label className="w-25">Title <span className="text-danger">*</span> </Form.Label>
                        <Form.Control required type="text" placeholder="Enter blog title here..." className="w-75" />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label className="w-25">Category <span className="text-danger">*</span> </Form.Label>
                        <Form.Select required className="w-75">
                            <option disabled>Choose blog category...</option>
                            <option>Design</option>
                            <option>Technology</option>
                            <option>Business</option>
                            <option>Lifestyle</option>
                            <option>Gaming</option>
                            <option>Nature</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label className="w-25">Content <span className="text-danger">*</span> </Form.Label>
                        <Form.Control required placeholder="Enter blog content here..." as="textarea" rows={10} className="my-3" />
                    </Form.Group>
                    <div className="d-flex justify-content-around">
                        <p className="w-75 fw-bold align-middle"><span className="text-danger">*</span> must be filled</p>
                        <div className="d-flex justify-content-between w-25">
                            <Link href={`/`}>
                                <Button className="btn btn-danger fw-bold">Cancel</Button>
                            </Link>
                            <Link href={`/`}>
                                <Button className="btn btn-primary fw-bold" type="submit">Create</Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </Container>
        </>
    )
}

export default CreatePost;