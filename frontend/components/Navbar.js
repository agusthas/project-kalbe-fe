import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Image } from "react-bootstrap";
import { signOut } from "next-auth/react";
import LoadingScreen from "./LoadingScreen";
import ImageWithFallback from "./ImageWithFallback";
import { useEffect, useState } from "react";
// import { getMe } from "@/modules/users/api";

const Navbar = () => {
    const router = useRouter()
    const activeLink = (url, pathname) => pathname === url ? "text-primary" : "text-dark"
    const { status, data: session } = useSession()
    // const [user, setUser] = useState(null)
    // useEffect(() => {
    //     const user = getMe(session.accessToken).then(res => setUser(res.data.data))
    //     console.log(user)
    // }, [status])

    if(status === 'loading'){
        return <LoadingScreen/>
    }
    else return (
        <Container fluid className="shadow" style={{zIndex: '999'}}>
            <nav class="navbar navbar-expand-lg bg-white container py-3">
                <Link class="navbar-brand d-flex align-items-center gap-2" href="/">
                    <Image src="/favicon.ico" alt="MyBlog"/>
                    <h3 className="fw-bold mb-0">MyBlog</h3>
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                    <li class="nav-item">
                        <Link class={`nav-link ${activeLink('/', router.pathname)}`} aria-current="page" href="/">Home</Link>
                    </li>
                    {
                    status === 'authenticated' ?
                    <li class="nav-item">
                        <Link class={`nav-link ${activeLink('/posts/create', router.pathname)}`} href="/posts/create">Create Blog</Link>
                    </li> : ""
                    }
                    {
                        status === 'authenticated' ?

                        <div className="d-flex align-items-start ms-lg-3 ms-lg-3 mt-3 mt-lg-0">
                            <ImageWithFallback
                                src={session.user.image}
                                fallbackSrc={"/images/profile-picture-placeholder.jpg"}
                                width={40}
                                height={40}
                                style={{objectFit: 'cover'}} 
                                class="rounded-circle border border-secondary" 
                                alt="Profile Image"
                            />
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {session.user.name}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" href={`/profile/view/${session.user.id}`}>Profile</Link></li>
                                    <li><a class="dropdown-item" onClick={() => signOut()}>Logout</a></li>
                                </ul>
                            </li>
                        </div>
                        :
                        <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                            <Link href={"/login"}>
                                <Button variant="primary">
                                    Sign In
                                </Button>
                            </Link>
                        </li>
                    }
                </ul>
                </div>
            </nav>
        </Container>
    )
}

export default Navbar;