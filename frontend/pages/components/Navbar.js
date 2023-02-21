import Link from "next/link";
import { Button, Container } from "react-bootstrap";

const Navbar = () => {
    return (
        <Container fluid className="px-5 shadow">
            <div className="bg-white text-primary px-5 py-3 d-flex justify-content-between align-items-center">
                <h2 className="text-primary fw-bold" style={{width: '85%'}}>MyBlog</h2>
                <div className="d-flex justify-content-between" style={{width: '15%'}}>
                    <Link href={`/`} className="text-decoration-none">
                        <p className="text-primary">Home</p>
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