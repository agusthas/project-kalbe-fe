import Link from "next/link";
import { Button, Container, Form } from "react-bootstrap";
import Layout from "@/components/Layout";
import { getCategories } from "@/modules/categories/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { createPost } from "@/modules/posts/api";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import {Editor} from "@tinymce/tinymce-react"

const CreatePost = ({categories}) => {
    const router = useRouter()
    const {status, data:session} = useSession()
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState(0)
    const [description, setDescription] = useState('')

    const [titleAlert, setTitleAlert] = useState('')
    const [categoryAlert, setCategoryAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')

    const [loading, setLoading] = useState(true)
    const [createAlert, setCreateAlert] = useState(false)

    const imageChangeHandler = (e) => {
        setImage(e.target.value)
    }

    const titleChangeHandler = (e) => {
        setTitle(e.target.value)
    }

    const categoryChangeHandler = (e) => {
        setCategory(e.target.value)
    }

    if(status === 'loading'){
        return <LoadingScreen />
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
            setCreateAlert(true)
            return
        }else{
            setCreateAlert(false)
        }
        const newPost = {
            title: title,
            categoryId: category,
            description: description,
            image: image.length > 0 ? image : null
        }
        
        createPost(newPost, session.accessToken).then((response) => {
            console.log(response)
            router.push('/')
        }).catch((err) => {
            console.log(err)
            setErrorAlert(err)
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
                {createAlert && <div className="alert alert-danger w-50 mx-auto py-3">
                    {titleAlert && <p className="text-center text-danger p-1 m-1">{titleAlert}</p>}
                    {categoryAlert && <p className="text-center text-danger p-1 m-1">{categoryAlert}</p>}
                    {descriptionAlert && <p className="text-center text-danger p-1 m-1">{descriptionAlert}</p>}
                </div>}
                <Form className="w-50 mx-auto py-3" onSubmit={createHandler}>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="image" className="w-25">Image URL</Form.Label>
                        <Form.Control value={image} onChange={imageChangeHandler} id="image" name="image" type="text" className="w-75" placeholder="Enter image URL here..."/>
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="title" className="w-25">Title <span className="text-danger">*</span> </Form.Label>
                        <Form.Control value={title} onChange={titleChangeHandler} id="title" name="title" type="text" placeholder="Enter blog title here..." className="w-75" />
                    </Form.Group>
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
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="description" className="w-25">Content <span className="text-danger">*</span> </Form.Label>
                        {loading && "Loading.."}
                        <Editor
                            apiKey="ic2z1zdhvj0vzyazri0jh2ph5w0kiij71y6q1by6h9x18nse"
                            onInit={() => setLoading(false)}
                            onEditorChange={(html) => setDescription(html ?? "")}
                            init={{
                                height: 300,
                                menubar: false,
                                statusbar: false,
                                plugins: "anchor autolink link lists table",
                                toolbar: "undo redo | bold italic underline strikethrough | link | numlist bullist indent outdent | removeformat",
                            }}
                        />
                    </Form.Group>
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