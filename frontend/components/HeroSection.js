import Image from "next/image"
import Link from "next/link"
import { Button, Container } from "react-bootstrap"
import HeroImage from "../public/images/hero-image.png"

export default function HeroSection(){
    return(
        <Container className="py-5"> 
            <div className="row py-3 align-items-center">
                <div className="col-md-6 mb-4">
                    <h1 className="display-4 fw-bold mb-3">Start writing your own blog.</h1>
                    <p className="fs-5 mb-3">Join our community with over 10000+ users</p>
                    <div className="d-flex gap-3">
                        <Button variant="primary" className="col-md-4 fw-semibold">Get Started</Button>
                        <Button variant="outline-primary" className="col-md-4 fw-semibold">Be a reader</Button>
                    </div>
                </div>
                <div className="col-md-6 position-relative">
                    <Image src={HeroImage} className="img-fluid shadow rounded" style={{aspectRatio: '16 / 9', objectFit: 'cover'}} alt="Hero Image"/>
                </div>
            </div>
        </Container>
    )
}