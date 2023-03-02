// Import des modules nécessaires pour créer la carte Leaflet dans React
import { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Import du fichier CSS pour styliser la carte
import styles from "../styles/Map.module.css";

// On utilise le composant MapContainer fourni par ReactLeaflet
const { MapContainer } = ReactLeaflet;

// Définition du composant Map
const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  // Utilisation de useEffect pour initialiser la carte et charger les images nécessaires
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
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  );
};

export default Map;
