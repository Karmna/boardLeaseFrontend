import Profile from "../components/Profile";
import Head from "next/head";

function profilePage() {
  return (
    <>
      <Head>
        <title>BoardLease : mon profil utilisateur</title>
        <meta
          property="og:title"
          content="BoardLease : mon profil utilisateur"
        />
      </Head>
      <Profile />
    </>
  );
}

export default profilePage;
