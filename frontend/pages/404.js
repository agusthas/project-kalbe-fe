import Layout from "@/components/Layout";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function PageNotFound(){
    return (
        <Layout title="Page Not Found">
            <div className="text-center py-5">
                <h1 className="fw-bold">Whoops, page not found!</h1>
                <p>You can go back to home instead.</p>
                <Link className="mx-auto" href="/">
                    <Button className="fw-bold" variant="primary">Home</Button>
                </Link>
            </div>
        </Layout>
    )
}