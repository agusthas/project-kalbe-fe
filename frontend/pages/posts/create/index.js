import Link from "next/link";
import { Button, Container, Form } from "react-bootstrap";
import Layout from "@/components/Layout";
import { getCategories } from "@/modules/categories/api";
import { useState } from "react";

const CreatePost = ({categories}) => {
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

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

    const createHandler = (e) => {
        e.preventDefault()
        const newPost = {
            image: image,
            title: title,
            category: category,
            description: description
        }
        setImage('')
        setTitle('')
        setCategory(0)
        setDescription('')
    }

    return(
        <Layout>
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">Create Blog</h1>
                <Form className="w-50 mx-auto py-3" action="/" method="POST">
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="image" className="w-25">Image URL</Form.Label>
                        <Form.Control value={image} onChange={imageChangeHandler} id="image" name="image" type="text" className="w-75" placeholder="Enter image URL here..."/>
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="title" className="w-25">Title <span className="text-danger">*</span> </Form.Label>
                        <Form.Control value={title} onChange={titleChangeHandler} required id="title" name="title" type="text" placeholder="Enter blog title here..." className="w-75" />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="category" className="w-25">Category <span className="text-danger">*</span> </Form.Label>
                        <Form.Select value={0} onChange={categoryChangeHandler} required id="category" name="category" className="w-75">
                            <option value={0} selected disabled>Choose blog category here...</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="description" className="w-25">Content <span className="text-danger">*</span> </Form.Label>
                        <Form.Control value={description} onChange={descriptionChangeHandler} id="description" name="description" required placeholder="Enter blog content here..." as="textarea" rows={10} className="my-3" />
                    </Form.Group>
                    <div className="d-flex justify-content-around">
                        <p className="w-75 fw-bold align-middle"><span className="text-danger">*</span> must be filled</p>
                        <div className="d-flex justify-content-between w-25">
                            <Link href={`/`}>
                                <Button className="btn text-white btn-danger fw-bold">Cancel</Button>
                            </Link>
                            <Link href={`/`}>
                                <Button onClick={createHandler} className="btn btn-primary fw-bold" type="submit">Create</Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </Container>
        </Layout>
    )
}

export default CreatePost;

export async function getServerSideProps(){
    const categories = await getCategories().then(res => res.data)
    return {
        props: {
            categories: categories.data ?? []
        }
    }
}