import Rent from "../components/Rent";
import Head from "next/head";

function rentPage() {
  return (
    <>
      <Head>
        <title>BoardLease : votre réservation de surf est validée</title>
        <meta
          property="og:title"
          content="BoardLease : votre réservation de surf est validée"
        />
      </Head>
      <Rent />
    </>
  );
}

export default rentPage;
