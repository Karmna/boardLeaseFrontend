import Search from "../components/Search";
import Map from "../components/Map";
import styles from "../styles/Search.module.css";

function SearchPage() {
  const DEFAULT_CENTER = [43.488, -1.555];

  return (
    <div>
      <Search />
      <Map width="800" height="600" center={DEFAULT_CENTER} zoom={12}>
        {({ TileLayer, Marker, Popup }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={DEFAULT_CENTER}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </>
        )}
      </Map>
    </div>
  );
}

export default SearchPage;
