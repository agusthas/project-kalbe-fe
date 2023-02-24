import { Image } from "react-bootstrap";

const ProfileCard = ({user}) => {
    return(
        <div className="d-flex align-items-center">
            <div>
                <Image src={user.avatar} alt={user.name} width={200} height={200} className="rounded-circle border border-dark border-1" />
            </div>
            <div className="mx-4">
                <h3 className="fw-bold">{user.name}</h3>
                <h6>{user.email}</h6>
                <p>{user.bio}</p>
                <p className="fw-bold mb-0">{user.posts.length} Posts <span className="fw-light">|</span> {user.comments.length} Comments</p>
            </div>
        </div>
    )
}

export default ProfileCard;