import * as React from "react";
import styles from "../styles/TheEnd.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";


function End() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");

  return (
    <div className={styles.content}>
      <div className={styles.textContainer}>
        <h1 className={styles.h1}>Toute l'équipe Board Lease</h1>
        <h1 className={styles.h1}>vous remercie pour votre attention!</h1>
        <h2 className={styles.h2}>Ambre, Sébastien, Antony, Xavier.</h2>
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.imageGif}
          src="/surfing-olympics.gif"
          layout="fill"
          objectFit="contain"
          alt="olympics Gif"
          priority={true}
        />
      </div>

    </div>
  );
}

export default End;
