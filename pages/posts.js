import Posts from "../components/Posts";
import Head from "next/head";

function PostsPage() {
  return (
    <>
      <Head>
        <title>BoardLease : annonce de surf à louer</title>
        <meta
          property="og:title"
          content="BoardLease : annonce de surf à louer"
        />
      </Head>
      <Posts />
    </>
  );
}

export default PostsPage;
