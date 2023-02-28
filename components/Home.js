import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/Home.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Input, Button } from "@mui/material";
import Image from "next/image";
import { DatePicker, Space } from "antd";
import { addSurfByPlace } from "../reducers/search";

function Home() {
  const dispatch = useDispatch();
  const matches = useMediaQuery("(min-width:768px)");
  const [searchPlace, setSearchPlace] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

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
    fetch("http://localhost:3000/surfs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        placeName: searchPlace,
        availabilities: { startDate: searchStartDate, endDate: searchEndDate },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addSurfByPlace(data));
        }
      });
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
      <Input
        className={styles.input}
        type="text"
        placeholder="searchPlace"
        id="searchPlace"
        onChange={(e) => setSearchPlace(e.target.value)}
        value={searchPlace}
      />
      <div className={styles.dateContainer}>
        <Space direction="vertical">
          <DatePicker onChange={handleStartDate} />
        </Space>
        <Space direction="vertical">
          <DatePicker onChange={handleEndDate} />
        </Space>
      </div>
      <a href="/search">
        <Button className={styles.button} onClick={() => handleSearch()}>
          Rechercher
        </Button>
      </a>
    </div>
  );
}

export default Home;
