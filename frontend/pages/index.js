import Layout from "@/components/Layout"
import HeroSection from "@/components/HeroSection"
import LatestPostSection from "@/components/LatestPostSection"
import PostSection from "@/components/PostSection"
import { getPosts } from "@/modules/posts/api";
import { getCategories } from "@/modules/categories/api";

export default function Home({posts, categories}) {
  return (
    <Layout>
      <HeroSection/>
      <LatestPostSection latestPosts={posts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,3)}/>
      <PostSection posts={posts} categories={categories}/>
    </Layout>
  );
}

export async function getStaticProps(){
  const posts = await getPosts().then(res => res.data)
  const categories = await getCategories().then(res => res.data)

  return {
    props: {
      posts: posts.data ?? [],
      categories: categories.data ?? []
    },
    revalidate: 30
  }
}