import "@/styles/globals.css";
import '@/styles/scss/global.scss';
import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import LoadingScreen from "@/components/LoadingScreen";

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps}/>
        </Auth>
      ):(
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  const router = useRouter()
  const { status } = useSession({ 
    required: true,
    onUnauthenticated(){
      router.push('/login' + (router.pathname !== '/' ? `?callbackUrl=${router.asPath}` : ''))
    },
  })

  if (status === "loading") {
    return <LoadingScreen/>
  }

  return children
}