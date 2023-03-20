import Booking from "../components/Booking";
import Head from "next/head";

function BookingPage() {
  return (
    <>
      <Head>
        <title>BoardLease : récapitulatif de la réservation</title>
        <meta
          property="og:title"
          content="BoardLease : récapitulatif réservation"
        />
      </Head>
      <Booking />
    </>
  );
}

export default BookingPage;
