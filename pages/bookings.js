import Bookings from "../components/Bookings";
import Head from "next/head";

function BookingsPage() {
  return (
    <>
      <Head>
        <title>
          BoardLease : récapitulatif des réservations de surf effectuées
        </title>
        <meta
          property="og:title"
          content="BoardLease : récapitulatif des réservations de surf effectuées"
        />
      </Head>
      <Bookings />
    </>
  );
}

export default BookingsPage;
