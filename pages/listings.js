import Listings from "../components/Listings";
import Head from "next/head";

function listingsPage() {
  return (
    <>
      <Head>
        <title>BoardLease : vos planches de surf mises en location</title>
        <meta
          property="og:title"
          content="BoardLease : vos planches de surf mises en location"
        />
      </Head>
      <Listings />
    </>
  );
}

export default listingsPage;
