import SignIn from "../components/SignIn";
import Head from "next/head";

function SignInPage() {
  return (
    <>
      <Head>
        <title>BoardLease : connexion à votre compte</title>
        <meta
          property="og:title"
          content="BoardLease : connexion à votre compte"
        />
      </Head>
      <SignIn />
    </>
  );
}

export default SignInPage;
