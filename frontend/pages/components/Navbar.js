import Link from "next/link";
import { Button, Container } from "react-bootstrap";

const Navbar = () => {
    return (
        <Container fluid className="px-0">
            <div className="bg-success text-white px-5 py-4 d-flex justify-content-between align-items-center">
                <Link href={`/`} className="text-decoration-none">
                    <h1 className="text-white">KalBlog</h1>
                </Link>
                <Link href={`/login`}>
                    <Button className="btn btn-light fw-bold">Login</Button>
                </Link>
            </div>
        </Container>
    );
}

export default Navbar;