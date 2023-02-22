import Link from "next/link";
import Layout from "@/components/Layout";
import { Button, Container } from "react-bootstrap";

export default function Home() {
  return (
    <Layout>
      <Container className="d-flex justify-content-end">
          <Link href={`/posts/create`}>
            <Button className="btn btn-primary fw-bold px-3">Create Blog</Button>  
          </Link>
      </Container> 
    </Layout>
  );
}
