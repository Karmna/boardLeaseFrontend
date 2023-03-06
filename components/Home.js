import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/Home.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { DatePicker, Space } from "antd";
import { addFilter } from "../reducers/filter";
import { storeTenantDateRange } from "../reducers/booking";
import { useRouter } from "next/router";

function Home() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");

  const dispatch = useDispatch();
  const [searchPlace, setSearchPlace] = useState("");
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const router = useRouter();

  const handleStartDate = (date, dateString) => {
    setSearchStartDate(dateString);
  };

  const handleEndDate = (date, dateString) => {
    setSearchEndDate(dateString);
  };

  // fonction qui gère la recherche de planches de surf disponibles par filtres
  const handleSearch = () => {
    dispatch(
      addFilter({
        type: [],
        level: [],
        maxPrice: 100,
        minRating: 0,
        placeName: searchPlace,
        availabilities: { startDate: searchStartDate, endDate: searchEndDate },
      })
    );

    dispatch(
      storeTenantDateRange({
        startDate: searchStartDate,
        endDate: searchEndDate,
      })
    );
    // redirige l'utilisateur vers la page de résultats de recherche
    router.push("/search");
  };

  return (
    <div className={styles.content}>
      <div className={styles.textContainer}>
        <h1 className={styles.h1}>Welcome to Board Lease !</h1>
        <h2 className={styles.h2}>Location de surfboard entre particuliers</h2>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/slide-image-1.webp"
          layout="fill"
          objectFit="contain"
          alt="Slide image 1"
          priority={true}
        />
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="Destination"
        id="searchPlace"
        onChange={(e) => setSearchPlace(e.target.value)}
        value={searchPlace}
      />
      <div className={styles.dateContainer}>
        <Space direction="vertical">
          <DatePicker onChange={handleStartDate} placeholder="Date de début" />
        </Space>
        <Space direction="vertical">
          <DatePicker onChange={handleEndDate} placeholder="Date de fin" />
        </Space>
      </div>
      <button className={styles.button} onClick={() => handleSearch()}>
        Rechercher
      </button>
    </div>
  );
}

export default Home;
