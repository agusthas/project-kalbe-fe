import Link from "next/link";

const PostCard = (post) => {
    return(
        <Link href={`/posts/${post.thumbnail}`} className="text-black text-decoration-none">
            <div className="my-5 w-100 d-flex flex-row align-items-center">
                <h1 className="w-50">{post.thumbnail}</h1>
                <div className="w-50 d-flex flex-column">
                    <h1>{post.title}</h1>
                    <p>{post.caption}</p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard;