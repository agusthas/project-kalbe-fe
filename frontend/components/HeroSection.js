import Image from "next/image"
import Link from "next/link"
import { Button, Container } from "react-bootstrap"
import HeroImage from "../public/images/hero-image.png"
import { ScrollIntoView } from "@/lib/scroll"
import { useSession } from "next-auth/react"

export default function HeroSection(){
    const session = useSession()
    return(
        <Container className="py-5"> 
            <div className="row py-3 align-items-center">
                {session.status === 'authenticated' ?
                    <div className="col-md-6 mb-4">
                        <h1 className="display-4 fw-bold mb-3">Welcome back,<br />{session.data.user.name}.</h1>
                        <p className="fs-5 mb-3">Start writing your own blog now.</p>
                        <div className="d-flex gap-3">
                            <Link href={"/posts/create"} className="col-md-4">
                                <Button variant="primary" className="fw-semibold w-100">
                                    Create Blog
                                </Button>
                            </Link>
                        </div>
                    </div> :
                    <div className="col-md-6 mb-4">
                        <h1 className="display-4 fw-bold mb-3">Start writing your<br />own blog.</h1>
                        <p className="fs-5 mb-3">Join our community with over 10.000+ users.</p>
                        <div className="d-flex gap-3">
                            <Link href={"/register"} className="col-md-4">
                                <Button variant="primary" className="fw-semibold w-100">
                                    Get Started
                                </Button>
                            </Link>
                            <Button variant="outline-primary" className="col-md-4 fw-semibold" onClick={() => ScrollIntoView({id:'post-section'})}>Be a reader</Button>
                        </div>
                    </div>
                }
                <div className="col-md-6 position-relative">
                    <Image src={HeroImage} className="img-fluid shadow rounded" style={{aspectRatio: '16 / 9', objectFit: 'cover'}} alt="Hero Image"/>
                </div>
            </div>
        </Container>
    )
}