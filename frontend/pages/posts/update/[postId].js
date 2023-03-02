import Layout from "@/components/Layout";
import { getCategories } from "@/modules/categories/api";
import { getPost } from "@/modules/posts/api";
import Link from "next/link";
import { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";

const UpdatePost = ({post, categories}) => {
    const [image, setImage] = useState(post.image)
    const [title, setTitle] = useState(post.title)
    const [initialCategory, setCategory] = useState(post.category.id)
    const [description, setDescription] = useState(post.description)

    const imageChangeHandler = (e) => {
        setImage(e.target.value)
    }

    const titleChangeHandler = (e) => {
        setTitle(e.target.value)
    }

    const categoryChangeHandler = (e) => {
        setCategory(e.target.value)
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value)
    }

    const updateHandler = (e) => {
        e.preventDefault()
        setImage('')
        setTitle('')
        setCategory(0)
        setDescription('')
    }

    return (
        <Layout>
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">{post.title}</h1>
                <div className="d-flex justify-content-center pt-4 pb-3">
                    <Image src={post.image} alt={post.title} className="w-25" />
                </div>
                <Form className="w-50 mx-auto py-3" action="/" method="POST">
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="image" className="w-25">Image URL</Form.Label>
                        <Form.Control onChange={imageChangeHandler} id="image" name="image" type="text" className="w-75" value={image} />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="title" className="w-25">Title</Form.Label>
                        <Form.Control onChange={titleChangeHandler} required id="title" name="title" type="text" className="w-75" value={title} />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="category" className="w-25">Category</Form.Label>
                        <Form.Select onChange={categoryChangeHandler} id="category" name="category" required className="w-75">
                            {categories.map(category => (
                                <option key={category.id} value={category.id} selected={category.id === initialCategory}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="description" className="w-25">Content</Form.Label>
                        <Form.Control onChange={descriptionChangeHandler} id="description" name="description" required as="textarea" rows={10} className="my-3" value={description} />
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

UpdatePost.auth = true
export default UpdatePost;

export async function getServerSideProps({params}){
    const post = await getPost(params.postId).then(res => res.data)
    const categories = await getCategories().then(res => res.data)
    return {
        props: {
            post: post.data ?? [],
            categories: categories.data ?? []
        }
    }
}