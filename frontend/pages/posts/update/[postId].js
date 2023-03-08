import ImageWithFallback from "@/components/ImageWithFallback";
import Layout from "@/components/Layout";
import LoadingScreen from "@/components/LoadingScreen";
import { getCategories } from "@/modules/categories/api";
import { getPost, updatePost } from "@/modules/posts/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";

const UpdatePost = ({post, categories}) => {
    const router = useRouter()
    const {status, data:session} = useSession()

    const [image, setImage] = useState(post.image)
    const [title, setTitle] = useState(post.title)
    const [initialCategory, setCategory] = useState(post.category.id)
    const [description, setDescription] = useState(post.description)

    const [titleAlert, setTitleAlert] = useState('')
    const [categoryAlert, setCategoryAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')

    const [updateAlert, setUpdateAlert] = useState(false)

    if(status === 'loading'){
        return <LoadingScreen />
    }

    if(post.author.id != session.user.id){
        router.push('/')
        return
    }

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
            setUpdateAlert(true)
            return
        }else{
            setUpdateAlert(false)
        }
        const updatedPost = {
            image: image.length > 0 ? image : null,
            title: title,
            categoryId: initialCategory,
            description: description
        }
        updatePost(post.id, updatedPost, session.accessToken).then((response) => {
            console.log(response)
            router.push('/')
        }).catch((err) => {
            console.log(err.response.data)
        }).finally(() => {
            setImage(image)
            setTitle(title)
            setCategory(initialCategory)
            setDescription(description)
        })
    }

    return (
        <Layout title="Update Blog">
            <Container className="px-0 py-5">
                <h1 className="text-center fw-bold">{post.title}</h1>
                <div className="d-flex justify-content-center pt-4 pb-3">
                    <ImageWithFallback
                        src={post.image}
                        fallbackSrc={"/images/no-image.png"}
                        fill
                        style={{aspectRatio: '16 / 9', objectFit: 'cover'}}
                        className="position-relative rounded shadow-sm w-25"
                        alt={post.title}
                    />
                </div>
                {updateAlert && <div className="alert alert-danger w-50 mx-auto py-3">
                    {titleAlert && <p className="text-center text-danger p-1 m-1">{titleAlert}</p>}
                    {categoryAlert && <p className="text-center text-danger p-1 m-1">{categoryAlert}</p>}
                    {descriptionAlert && <p className="text-center text-danger p-1 m-1">{descriptionAlert}</p>}
                </div>}
                <Form className="w-50 mx-auto py-3" onSubmit={updateHandler}>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="image" className="w-25">Image URL</Form.Label>
                        <Form.Control onChange={imageChangeHandler} id="image" name="image" type="text" className="w-75" value={image} />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="title" className="w-25">Title</Form.Label>
                        <Form.Control onChange={titleChangeHandler} id="title" name="title" type="text" className="w-75" value={title} />
                    </Form.Group>
                    <Form.Group className="py-3 d-flex justify-content-between align-items-center">
                        <Form.Label htmlFor="category" className="w-25">Category</Form.Label>
                        <Form.Select onChange={categoryChangeHandler} id="category" name="category" className="w-75">
                            {categories.map(category => (
                                <option key={category.id} value={category.id} selected={category.id === initialCategory}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="py-3">
                        <Form.Label htmlFor="description" className="w-25">Content</Form.Label>
                        <Form.Control onChange={descriptionChangeHandler} id="description" name="description" as="textarea" rows={10} className="my-3" value={description} style={{resize: 'none'}}/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-between w-25">
                            <Link href={`/profile/view/${session.user.id}`}>
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

UpdatePost.auth = true
export default UpdatePost;

export async function getServerSideProps({params}){
    const post = await getPost(params.postId).then(res => res.data)
    if(!post) return{
        notFound: true
    }
    const categories = await getCategories().then(res => res.data)
    return {
        props: {
            post: post.data ?? [],
            categories: categories.data ?? []
        }
    }
}