import styles from "../styles/Favorites.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Surf from "./Surf";
import { addToFavorites } from "../reducers/favorites";

function Favorites() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const surfs = useSelector((state) => state.surfs.value);
  const favorites = useSelector((state) => state.favorites.value);
  const [favoriteDisplay, setFavoriteDisplay] = useState()

  useEffect(() => {
    fetch(`https://board-lease-backend.vercel.app/surfs/favorites`, {
      method: "GET",
      headers: { 
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json" },      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Réponse BDD get favorites', data)        
          setFavoriteDisplay((data.data));        
      });
  }, [favorites]);

  // création du composant Surf en fonction des données surfs récupérées
  const displayFavorites = (favoriteDisplay =
    favoriteDisplay && favoriteDisplay.length > 0 ? (
      favoriteDisplay.map((data, i) => {
        const isFavorite = favorites.some(favorite => favorite._id === data._id);
        return <Surf key={i} {...data} isFavorite={isFavorite}/>;
      })
    ) : (
      <p className={styles.searchError}>Aucun surf dans vos favoris.</p>
    ));

  return (
    <div className={styles.content}>
      <div className={styles.cardsContainer}>{displayFavorites}</div>
    </div>
  );
}

export default Favorites;
