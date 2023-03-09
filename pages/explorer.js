import { useEffect, useState } from "react";
import styles from "../styles/Map.module.css";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map"), { ssr: false });

function ExplorerPage() {
  const [surfs, setSurfs] = useState(null);

  useEffect(() => {   
    fetch(`https://board-lease-backend.vercel.app/surfs/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse BDD get surfs", data);
        setSurfs(data.surfs);
      });
  }, []);

  return (
    <div className={styles.mapContainer}>
      <MapWithNoSSR surfs={surfs} />
    </div>
  );
}

export default ExplorerPage;
