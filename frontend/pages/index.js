import Layout from "@/components/Layout"
import HeroSection from "@/components/HeroSection"
import LatestPostSection from "@/components/LatestPostSection"
import PostSection from "@/components/PostSection"

export default function Home({posts}) {
  return (
    <Layout>
      <HeroSection/>
      <LatestPostSection latestPosts={posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,3)}/>
      <PostSection posts={posts}/>
    </Layout>
  );
}

async function getAllPosts(){
  const posts = await fetch("http://localhost:3001/posts")
                  .then(res => res.json())
                  .catch(error => console.log(error))
  return posts?.data
}

export async function getStaticProps(){
  const posts = await getAllPosts() ?? []

  return {
    props: {
      posts
    },
    revalidate: 30
  }
}