import Home from "../components/Home";
import Head from "next/head";

function Index() {
  return (
    <>
      <Head>
        <title>BoardLease : location de surfboards entre particuliers</title>
        <meta
          property="og:title"
          content="BoardLease : location de surfboards entre particuliers"
        />
      </Head>
      <Home />
    </>
  );
}

export default Index;
