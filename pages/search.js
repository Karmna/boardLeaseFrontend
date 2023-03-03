import Search from "../components/Search";
import Map from "../components/Map";
import Rating from "../components/Rating";
import styles from "../styles/Search.module.css";
import { useSelector, useDispatch } from "react-redux";

function SearchPage() {
  const surfs = useSelector((state) => state.surfs.value);

  const DEFAULT_CENTER = [43.488, -1.555];

  return (
    <div className={styles.searchPageContainer}>
      <Search />
      <Rating />
      <Map width="800" height="600" center={DEFAULT_CENTER} zoom={8}>
        {({ TileLayer, Marker, Popup }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {surfs &&
              surfs.map((data, i) => {
                return (
                  <Marker key={i} position={[data.latitude, data.longitude]}>
                    <Popup>
                      <u>
                        <strong>{data.type}</strong>
                      </u>
                      <br />
                      <u>
                        <strong>Prix:</strong>
                      </u>
                      &nbsp; {data.dayPrice} € / jour
                    </Popup>
                  </Marker>
                );
              })}
          </>
        )}
      </Map>
    </div>
  );
}

export default SearchPage;
