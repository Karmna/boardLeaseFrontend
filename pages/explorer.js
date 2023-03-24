import styles from "../styles/Map.module.css";
import dynamic from "next/dynamic";
import Head from "next/head";

const MapWithNoSSR = dynamic(() => import("../components/Map"), { ssr: false });

function ExplorerPage() {
  return (
    <div className={styles.mapContainer}>
      <Head>
        <title>BoardLease : explorer les surfs en location</title>
        <meta
          property="og:title"
          content="BoardLease : explorer les surfs en location"
        />
      </Head>
      <MapWithNoSSR />
    </div>
  );
}

export default ExplorerPage;
