import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container, Image } from "react-bootstrap";
import { signOut } from "next-auth/react";
import LoadingScreen from "./LoadingScreen";
const Navbar = () => {
    const router = useRouter()
    const activeLink = (url, pathname) => pathname === url ? "text-primary" : "text-dark"

    const { status, session } = useSession()
    if(status === 'loading'){
        return <LoadingScreen/>
    }
    else return (
        <Container fluid className="shadow" style={{zIndex: '999'}}>
            <nav class="navbar navbar-expand-lg bg-white container py-3">
                <a class="navbar-brand d-flex align-items-center gap-2" href="#">
                    <Image src="/favicon.ico"/>
                    <h3 className="fw-bold mb-0">MyBlog</h3>
                </a>
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
                        <Link class={`nav-link ${activeLink('/posts/create', router.pathname)}`} href="/posts/create">Create Post</Link>
                    </li> : ""
                    }
                    {
                        status === 'authenticated' ?
                        <li class="nav-item dropdown d-flex ms-lg-3 ms-lg-3 mt-3 mt-lg-0">
                            <Image src={session.user.avatar} width={40} height={40} className="rounded-circle" style={{objectFit: 'cover'}}/>
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {session.user.name}
                            </a>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" href={`/profile/view/${session.user.id}`}>Profile</Link></li>
                                <li><Link class="dropdown-item" onClick={() => signOut()}>Logout</Link></li>
                            </ul>
                        </li>
                        :
                        <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                            <Button variant="primary">Sign In</Button>
                        </li>
                    }
                </ul>
                </div>
            </nav>
        </Container>
    )
}

export default Navbar;