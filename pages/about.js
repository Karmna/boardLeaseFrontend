import About from "../components/About";
import Head from "next/head";

function aboutPage() {
  return (
    <>
      <Head>
        <title>BoardLease : location de surfboards entre particuliers</title>
        <meta
          property="og:title"
          content="BoardLease : à propos de la location de surfboards entre particuliers"
        />
      </Head>
      <About />
    </>
  );
}

export default aboutPage;
