import Link from "next/link";
import { Image } from "react-bootstrap";

const ProfileCard = ({user, showUpdateOption = false}) => {
    return(
        <div className="d-flex align-items-center">
            <div>
                {user.avatar === null 
                ? <Image src={`/images/profile-picture-placeholder.jpg`} alt={user.name} width={200} height={200} className="rounded-circle border border-dark border-1" />
                : <Image src={user.avatar} alt={user.name} width={200} height={200} className="rounded-circle border border-dark border-1" />}
            </div>
            <div className="mx-4">
                <h3 className="fw-bold">{user.name}</h3>
                <h6>{user.email}</h6>
                <p>{user.bio}</p>
                <p className="fw-bold mb-0">{user.posts.length} Posts <span className="fw-light">|</span> {user.comments.length} Comments</p>
                {showUpdateOption ? 
                <Link className="btn btn-primary fw-bold my-3" href={`/profile/update/${user.id}`}>
                    Update Profile
                </Link> : ""}
            </div>
        </div>
    )
}

export default ProfileCard;