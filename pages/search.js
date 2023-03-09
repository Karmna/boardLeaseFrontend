import { useSelector } from "react-redux"
import Search from "../components/Search";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/Map"), { ssr: false });

function SearchPage() {
  const surfs = useSelector((state) => state.surfs.value);
 
  return (
    <div >
      <Search/>          
      {/* <MapWithNoSSR className={styles.map} surfs={surfs}/> */}
    </div>
  );
}

export default SearchPage;
