import Layout from "@/components/Layout";
import Link from "next/link";
import { Button, Container, Form, Image } from "react-bootstrap";

const UpdatePost = () => {
    return (
        <Layout>
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">{post}</h1>
                <div className="d-flex justify-content-center pt-4 pb-3">
                    <Image src="https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516__340.jpg" alt="title" className="w-25" />
                </div>
                <Form className="w-50 mx-auto py-3" action="/" method="POST">
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label className="w-25">Image</Form.Label>
                        <Form.Control type="file" className="w-75" />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label className="w-25">Title</Form.Label>
                        <Form.Control required type="text" className="w-75" />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label className="w-25">Category</Form.Label>
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
                        <Form.Label className="w-25">Content</Form.Label>
                        <Form.Control required as="textarea" rows={10} className="my-3" />
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

export default UpdatePost;

async function getPostById(id){
    const post = await fetch(`http://localhost:3001/posts/${id}`)
                    .then(res => res.json())
                    .catch(error => console.log(error))
    return post?.data
}

export async function getStaticProps(){
    const post = await getPostById() ?? []

    return {
        props: {
            post
        },
        revalidate: 30
    }
}