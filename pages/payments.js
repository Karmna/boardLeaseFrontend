import Payments from "../components/Payments";
import Head from "next/head";

function PaymentsPage() {
  return (
    <>
      <Head>
        <title>BoardLease : paiement de votre réservation de surf</title>
        <meta
          property="og:title"
          content="BoardLease : paiement de votre réservation de surf"
        />
      </Head>
      <Payments />
    </>
  );
}

export default PaymentsPage;
