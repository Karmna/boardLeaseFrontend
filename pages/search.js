import Search from "../components/Search";
import Head from "next/head";

function SearchPage() {
  return (
    <div>
      <Head>
        <title>BoardLease : surfs en location pour votre destination</title>
        <meta
          property="og:title"
          content="BoardLease : surfs en location pour votre destination"
        />
      </Head>
      <Search />
    </div>
  );
}

export default SearchPage;
