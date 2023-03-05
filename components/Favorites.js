import styles from "../styles/Favorites.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Surf from "./Surf";
import FavoritesManagement from "./FavoritesManagement";

function Favorites() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");
  const user = useSelector((state) => state.user.value);
  const favorites = useSelector((state) => state.favorites.value);
  const [favoriteDisplay, setFavoriteDisplay] = useState();

  useEffect(() => {
    fetch(`https://board-lease-backend.vercel.app/surfs/favorites`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse BDD get favorites", data);
        setFavoriteDisplay(data.data);
      });
  }, [favorites]);

  // création du composant Surf en fonction des données récupérées
  const displayFavorites = (favoriteDisplay =
    favoriteDisplay && favoriteDisplay.length > 0 ? (
      favoriteDisplay.map((data, i) => {
        const isFavorite = favorites.some(
          (favorite) => favorite._id === data._id
        );
        return (
          <div className={styles.card}>
            <Surf key={i} {...data} isFavorite={isFavorite} />
            <FavoritesManagement surf_Id={data._id} />
          </div>
        );
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
