import TheEnd from "../components/TheEnd";
import Head from "next/head";

function endPage() {
  return (
    <>
      <Head>
        <title>BoardLease : votre réservation de surf est validée</title>
        <meta
          property="og:title"
          content="BoardLease : votre réservation de surf est validée"
        />
      </Head>
      <TheEnd />
    </>
  );
}

export default endPage;
