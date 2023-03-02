import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Home.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { DatePicker, Space } from "antd";
import { addSurfs } from "../reducers/surfs";
import { addFilter } from "../reducers/filter";
import { useRouter } from 'next/router'

function Home() {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:768px)");
  const filter = useSelector((state) => state.filter.value);
  const [searchPlace, setSearchPlace] = useState("");
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const router = useRouter()

  console.log(
    "placeName",
    searchPlace,
    "startDate",
    searchStartDate,
    "endDate",
    searchEndDate
  );

  const handleStartDate = (date, dateString) => {
    setSearchStartDate(dateString);
  };

  const handleEndDate = (date, dateString) => {
    setSearchEndDate(dateString);
  };

  const handleSearch = () => {
    console.log("Recherche par placeName envoyée au serveur")
    // fetch("http://localhost:3000/surfs/filter", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     type: filter.type,
    //     level: filter.level,
    //     maxPrice: filter.maxPrice,
    //     minRating: filter.minRating, 
    //     placeName: searchPlace,
    //     availabilities: [{ startDate: searchStartDate, endDate: searchEndDate }],
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {     
        // console.log("réponse du serveur requete home.js", JSON.stringify(data)) 
          // dispatch(addSurfs(data.data));          
          // console.log("Ajout des surfs au reducer surfs", JSON.stringify(data.data)); 
          console.log("Etats", searchPlace, searchStartDate, searchEndDate); 
          dispatch(addFilter({
            type: [],
            level: [],
            maxPrice: 100,
            minRating: 0,           
            placeName: searchPlace,
            availabilities: [{ startDate: searchStartDate, endDate: searchEndDate }],
          }));
          console.log("Ajout des données placeName et availabilities au reducer filter", JSON.stringify(filter));      
      // });
      router.push("/search")
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
