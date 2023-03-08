import { useSelector } from "react-redux"
import Search from "../components/Search";
import Rating from "../components/Rating";
import styles from "../styles/Search.module.css";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map"), { ssr: false });

function SearchPage() {
  const surfs = useSelector((state) => state.surfs.value);
 
  return (
    <div className={styles.searchPageContainer}>
      <Search />
      <Rating />
      <MapWithNoSSR surfs={surfs}/>
    </div>
  );
}

export default SearchPage;
