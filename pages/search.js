import Search from "../components/Search";
import Map from "../components/Map";
import Markers from "../components/Markers";
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
        {({ TileLayer }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {surfs &&
              surfs.map((data, i) => {
                return <Markers key={i} markerData={data} />;
              })}
          </>
        )}
      </Map>
    </div>
  );
}

export default SearchPage;
