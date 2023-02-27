import * as React from "react";
import styles from "../styles/Home.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Input, Button } from "@mui/material";
import Image from "next/image";
import { DatePicker, Space } from "antd";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

function Home() {
  const matches = useMediaQuery("(min-width:768px)");

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
        />
      </div>
      <Input
        className={styles.input}
        type="text"
        placeholder="Rechercher"
        id="destination"
      />
      <div className={styles.dateContainer}>
        <Space direction="vertical">
          <DatePicker onChange={onChange} />
        </Space>
        <Space direction="vertical">
          <DatePicker onChange={onChange} />
        </Space>
      </div>
      <Button className={styles.button}>Réserver</Button>
    </div>
  );
}

export default Home;
