import Link from "next/link";
import { Button, Container, Form } from "react-bootstrap";
import Layout from "@/components/Layout";
import { getCategories } from "@/modules/categories/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { createPost } from "@/modules/posts/api";
import { useSession } from "next-auth/react";

const CreatePost = ({categories}) => {
    const router = useRouter()
    const session = useSession()
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState(0)
    const [description, setDescription] = useState('')

    const [titleAlert, setTitleAlert] = useState('')
    const [categoryAlert, setCategoryAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')

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
        let error = 0
        if(title.length <= 0){
            setTitleAlert('Blog title must be filled!')
            error = 1
        }else if(title.length > 50){
            setTitleAlert('Blog title must not have more than 50 characters!')
            error = 1
        }else{
            setTitleAlert('')
        }
        if(category == 0){
            setCategoryAlert('Blog category must be selected!')
            error = 1
        }else{
            setCategoryAlert('')
        }
        if(description.length <= 0){
            setDescriptionAlert('Blog content must be filled!')
            error = 1
        }else{
            setDescriptionAlert('')
        }
        if(error > 0){
            return
        }
        const newPost = {
            image: image,
            title: title,
            categoryId: category,
            description: description
        }
        createPost(newPost, session.data.accessToken).then((response) => {
            console.log(response)
            router.push('/')
        }).catch((err) => {
            console.log(err.response.data)
        }).finally(() => {
            setImage('')
            setTitle('')
            setCategory(0)
            setDescription('')
        })
    }

    return(
        <Layout title="Create Blog">
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">Create Blog</h1>
                <Form className="w-50 mx-auto py-3" onSubmit={createHandler}>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="image" className="w-25">Image URL</Form.Label>
                        <Form.Control value={image} onChange={imageChangeHandler} id="image" name="image" type="text" className="w-75" placeholder="Enter image URL here..."/>
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="title" className="w-25">Title <span className="text-danger">*</span> </Form.Label>
                        <Form.Control value={title} onChange={titleChangeHandler} id="title" name="title" type="text" placeholder="Enter blog title here..." className="w-75" />
                    </Form.Group>
                    {titleAlert && <p id="title" className="d-flex flex-column text-center text-danger p-2 m-1" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{titleAlert}</p>}
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="category" className="w-25">Category <span className="text-danger">*</span> </Form.Label>
                        <Form.Select onChange={categoryChangeHandler} id="category" name="category" className="w-75">
                            <option value={0}>Choose blog category here...</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    {categoryAlert && <p id="category" className="d-flex flex-column text-center text-danger p-2 m-1" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{categoryAlert}</p>}
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="description" className="w-25">Content <span className="text-danger">*</span> </Form.Label>
                        <Form.Control value={description} onChange={descriptionChangeHandler} id="description" name="description" placeholder="Enter blog content here..." as="textarea" rows={10} className="my-3" />
                    </Form.Group>
                    {descriptionAlert && <p id="description" className="d-flex flex-column text-center text-danger p-2 mb-4" style={{ borderRadius: '10px', backgroundColor: '#ffc7d0' }}>{descriptionAlert}</p>}
                    <div className="d-flex justify-content-around">
                        <p className="w-75 fw-bold align-middle"><span className="text-danger">*</span> must be filled</p>
                        <div className="d-flex justify-content-between w-25">
                            <Link href={`/`}>
                                <Button className="btn text-white btn-danger fw-bold">Cancel</Button>
                            </Link>
                            <Button className="btn btn-primary fw-bold" type="submit">Create</Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </Layout>
    )
}

CreatePost.auth = true
export default CreatePost;

export async function getServerSideProps(){
    const categories = await getCategories().then(res => res.data)
    return {
        props: {
            categories: categories.data ?? []
        }
    }
}