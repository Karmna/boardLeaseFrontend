// Import de la fonction dynamique de Next.js permettant de charger un composant de manière asynchrone
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("./DynamicMap"), {
  ssr: false, // Empêche le rendu côté serveur (server-side rendering)
});

// Définition des dimensions par défaut de la carte
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Map = (props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    <div style={{ aspectRatio: width / height }}>
      <MapWithNoSSR {...props} />
    </div>
  );
};

export default Map;
