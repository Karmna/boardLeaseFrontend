import Recap from "../components/Recap";
import Head from "next/head";

function RecapPage() {
  return (
    <>
      <Head>
        <title>BoardLease : votre réservation de surf est validée</title>
        <meta
          property="og:title"
          content="BoardLease : votre réservation de surf est validée"
        />
      </Head>
      <Recap />
    </>
  );
}

export default RecapPage;
