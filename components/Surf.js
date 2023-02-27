import Image from "next/image";
import styles from "../styles/Surf.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Rate } from "antd";

function Surf(props) {
  const matches = useMediaQuery("(min-width:768px)");

  const surfDisplay = !matches ? (
    <div className={styles.card}>
      <Image src={props.pictures} alt={props.name} width={100} height={100} />
      <div className={styles.description}>
        <h3 className={styles.name}>{props.name}</h3>
        <p className={styles.level}>Niveau: {props.level}</p>
        <span className={styles.rating}>
          <Rate value={props.rating} />
        </span>
      </div>
    </div>
  ) : (
    <div className={styles.card}>
      <Image src={props.pictures} alt={props.name} width={100} height={100} />
      <div className={styles.description}>
        <h3 className={styles.name}>{props.name}</h3>
        <p className={styles.level}>Niveau: {props.level}</p>
        <p className={styles.availabilities}>{props.availabilities}</p>
        <span className={styles.rating}>
          <Rate value={props.rating} />
        </span>
      </div>
      <div className={styles.detailsContent}>
        <p className={styles.detail}>{props.owner}</p>
        <p className={styles.detail}>{props.place}</p>
        <p className={styles.detail}>{props.dayPrice}</p>
        <p className={styles.detail}>{props.deposit}</p>
      </div>
    </div>
  );

  return <div>{surfDisplay}</div>;
}

export default Surf;
