import SignUp from "../components/SignUp";
import Head from "next/head";

function SignUpPage() {
  return (
    <>
      <Head>
        <title>BoardLease : inscription</title>
        <meta property="og:title" content="BoardLease : inscription" />
      </Head>
      <SignUp />
    </>
  );
}

export default SignUpPage;
