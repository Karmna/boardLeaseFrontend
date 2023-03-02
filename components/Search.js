import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "../styles/Search.module.css";
import Surf from "./Surf";
import Filter from "./Filter";
import useMediaQuery from "@mui/material/useMediaQuery";
import { addSurfs } from "../reducers/surfs";

function Search() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.value);
  const surfs = useSelector((state) => state.surfs.value);

  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");

  // utilisation de useEffect pour requeter au serveur une recherche de surfs selon les critères sélectionnés au changement d'état de filter
  useEffect(() => {
    fetch("http://localhost:3000/surfs/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: filter.type,
        level: filter.level,
        maxPrice: filter.maxPrice,
        minRating: filter.minRating,
        placeName: filter.placeName,
        availabilities: filter.availabilities,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addSurfs(data.data));
      });
  }, [filter]);

  // création du composant Surf en fonction des données surfs récupérées
  const surf = (surf =
    surfs && surfs.length > 0 ? (
      surfs.map((data, i) => {
        return <Surf key={i} {...data} />;
      })
    ) : (
      <p className={styles.searchError}>
        Aucun surf disponible correspond à vos critères.
      </p>
    ));

  return (
    <div className={styles.content}>
      <Filter />
      <div className={styles.cardsContainer}>{surf}</div>
    </div>
  );
}

export default Search;
