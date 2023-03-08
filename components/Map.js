// Import des modules nécessaires pour créer la carte Leaflet dans React
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import Markers from "./Markers";
import { TileLayer, MapContainer, useMap, Popup } from "react-leaflet";

// Définition des dimensions par défaut de la carte
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

// Définition de la position du centre de la carte par défaut au chargement
const DEFAULT_CENTER = [43.488, -1.555];

// Définition de la valeur du zoom par défaut au chargement
const DEFAULT_ZOOM = 5;

const Map = ({surfs}) => {  

  // Utilisation de useEffect pour initialiser la carte et charger les images nécessaires et pour charger les surfs depuis la BDD
  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet_images/marker-icon-2x.png",
        iconUrl: "leaflet_images/marker-icon.png",
        shadowUrl: "leaflet_images/marker-shadow.png",
      });
    })();    
  }, []);

  return (
    <MapContainer
      style={{ aspectRatio: DEFAULT_WIDTH / DEFAULT_HEIGHT }}
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {surfs &&
        surfs.map((data, i) => {
          return <Markers key={i} markerData={data} />;
        })}
      {/* <Marker position={DEFAULT_CENTER}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
