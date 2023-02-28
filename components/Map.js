import { MapContainer, TileLayer, Marker, Popup  } from "react-leaflet";
import { useEffect } from "react";
import styles from "../styles/Map.module.css";

function Map() {
  let map;
  useEffect(() => {
    if (typeof window !== "undefined") {
      map = (
        <MapContainer
          className={styles.map}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      );
    }
  },[]);

  return <div>{map}</div>;
}

export default Map;
