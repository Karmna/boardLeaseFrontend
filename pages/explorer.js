import styles from "../styles/Explorer.module.css";
import Map from "../components/Map";
import Markers from "../components/Markers";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function ExplorerPage() {
  const [surfs, setSurfs] = useState();
  console.log("surfs", surfs)

  useEffect(() => {
    fetch(`https://board-lease-backend.vercel.app/surfs/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse BDD get surfs", data);
        setSurfs(data);
      });
  }, []);

  const DEFAULT_CENTER = [43.488, -1.555];

  return (
    <div className={styles.mapContainer}>
      <Map width="800" height="1500" center={DEFAULT_CENTER} zoom={6}>
        {({ TileLayer }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {surfs &&
              surfs.surfs.map((data, i) => {
                return (
                  <Markers key={i} markerData={data}/>
                );
              })}
          </>
        )}
      </Map>
    </div>
  );
}

export default ExplorerPage;
