import styles from "../styles/Posts.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import * as React from "react";
import { Button, Image } from "antd";
import { useRouter } from "next/router";
import FavoritesManagement from "./FavoritesManagement";

function Posts() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");
  const router = useRouter();
  const [surfDetails, setSurfDetails] = useState();
  console.log("surfDetails", surfDetails);

  useEffect(() => {
    if (router.query.surfProps) {
      const propsJSON = JSON.parse(router.query.surfProps);
      setSurfDetails(propsJSON);
    }
  }, [router.query.surfProps]);

  return (
    <div>
      {surfDetails ? (
        <>
          <Image src={surfDetails.pictures} alt={surfDetails.name} />
          <div className={styles.title}>
            <h1>{surfDetails.name}</h1>
            <FavoritesManagement surf_Id={surfDetails._id} />
          </div>
          <p>{surfDetails.placeName}</p>
          <p>{surfDetails.type}</p>
          <p>{surfDetails.rating}</p>
          <Button> Réserver </Button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Posts;
