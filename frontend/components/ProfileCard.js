import Link from "next/link";
import { Image } from "react-bootstrap";
import ImageWithFallback from "./ImageWithFallback";

const ProfileCard = ({user, showUpdateOption = false}) => {
    return(
        <div className="d-flex align-items-center">
            <div>
                <ImageWithFallback
                    src={user.avatar}
                    fallbackSrc={"/images/profile-picture-placeholder.jpg"}
                    alt={user.name}
                    width={200}
                    height={200}
                    className="rounded-circle border shadow-sm"
                />
            </div>
            <div className="mx-4 w-100">
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