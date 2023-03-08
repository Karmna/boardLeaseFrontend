import styles from "../styles/Listings.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Surf from "./Surf";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { message, Divider } from "antd";

function Listings() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");
  const user = useSelector((state) => state.user.value);
  const [listingDisplay, setListingDisplay] = useState();

  console.log("Listings");
  useEffect(() => {
    fetch(`http://localhost:3000/surfs/displayListing`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse BDD get listings", data);
        setListingDisplay(data.listingData);
      });
  }, []);

  console.log("listing", listingDisplay);

  // Delete du surf aprés clique sur icon "Delete"
  const handleDelete = (surfId) => {
    fetch("http://localhost:3000/surfs/deleteListing", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: surfId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          message.success("Votre annonce vient d'être supprimée, merci !");
        } else {
          message.error("Oups ! Veuillez recommencer svp.");
        }
      });
  };

  // création du composant Surf en fonction des données récupérées
  const displayListings = (listingDisplay =
    listingDisplay && listingDisplay.length > 0 ? (
      listingDisplay.map((data, i) => {
        console.log(data._id);
        return (
          <div className={styles.card}>
            <div>
              <Surf key={i} {...data} />
            </div>

            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(data._id)}
            >
              <DeleteOutlineIcon style={styles.deleteIcon} />
            </button>

          </div>
        );
      })
    ) : (
      <p className={styles.searchError}>Aucun surf dans vos annonces.</p>
    ));

  return (
    <div className={styles.container}>
      <h1> Mes Annonces </h1>
      <div className={styles.cardsContainer}>{displayListings}</div>
    </div>
  );
}

export default Listings;
