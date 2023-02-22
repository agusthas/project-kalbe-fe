import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";

const Navbar = () => {
    const router = useRouter()
    const activeLink = (url, pathname) => pathname === url ? "text-primary" : "text-dark"
    return (
        <Container fluid className="shadow">
            <div className="bg-white text-primary container py-3 d-flex justify-content-between align-items-center">
                <h2 className="text-primary fw-bold">MyBlog</h2>
                <div className="d-flex align-items-center gap-5">
                    <Link href={`/`} className={`${activeLink('/', router.pathname)} mb-0 text-decoration-none`}>
                        Home
                    </Link>
                    <Link href={`/login`}>
                        <Button className="btn btn-primary fw-bold">Sign In</Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
}

export default Navbar;