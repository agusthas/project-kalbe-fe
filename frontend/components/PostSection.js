import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import PostCard from "./PostCard"

export default function PostSection({posts, categories}){
    const [filteredPosts, setPosts] = useState(posts)
    const [activeCategory, setCategory] = useState("all")

    const filterByCategory = (category) => {
        setPosts(category === 'all' ? posts : posts.filter(post => post.category.name === category))
        setCategory(category)
    }

    return(
        <Container className="py-5 min-vh-100">
            <div className="row mb-4">
                <div className="col text-center">
                    <h2 className="fw-bold">Our Posts</h2>
                </div>
            </div>
            <div className="row mb-4">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={`nav-link ${activeCategory === 'all' ? "active text-primary" : "text-dark"}`} style={{cursor: 'pointer'}} onClick={() => filterByCategory('all')}>View All</a>
                    </li>
                    {categories.map(category => (
                        <li className="nav-item" key={category.id}>
                            <a className={`nav-link ${activeCategory === category.name ? "active text-primary" : "text-dark"}`} style={{cursor: 'pointer'}} onClick={() => filterByCategory(category.name)}>{category.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="row g-3">
                {filteredPosts.map(post => (
                    <div className="col-lg-3 col-md-4 mb-3">
                        <PostCard post={post} key={post.id}/>
                    </div>
                ))}
            </div>
        </Container>
    )
}