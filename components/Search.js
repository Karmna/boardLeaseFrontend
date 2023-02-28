import { useSelector } from "react-redux";
import styles from "../styles/Search.module.css";
import Surf from "./Surf";
import Filter from "./Filter";
import dynamic from "next/dynamic";
import useMediaQuery from "@mui/material/useMediaQuery";
import { surfsData } from "../data/surfsData";

const Map = dynamic(() => import("./Map"), { ssr: false });

function Search() {
  const matches = useMediaQuery("(min-width:768px)");
  const filter = useSelector((state) => state.filter.value);
  // const surfs = useSelector((state) => state.filter.value);

  const surfs = surfsData.map((data, i) => {
    return <Surf key={i} {...data} />;
  });

  return (
    <div className={styles.content}>
      <Filter />
      <div className={styles.cardsContainer}>{surfs}</div>
      <Map />      
    </div>
  );
}

export default Search;
