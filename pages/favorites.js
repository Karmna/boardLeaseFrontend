import Favorites from "../components/Favorites";
import Head from "next/head";

function FavoritesPage() {
  return (
    <>
      <Head>
        <title>BoardLease : planches de surf favorites</title>
        <meta
          property="og:title"
          content="BoardLease : planches de surf favorites"
        />
      </Head>
      <Favorites />
    </>
  );
}

export default FavoritesPage;
