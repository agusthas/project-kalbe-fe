import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  ) ;
}
