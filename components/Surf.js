import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import styles from "../styles/Surf.module.css";
import { Rate } from "antd";

function Surf(props) {
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <Image src={props.pictures} alt={props.name} width={280} height={280} />
      <div className={styles.description}>
        <h3 className={styles.name}>{props.name}</h3>
        <p className={styles.level}>{props.level}</p>
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
}

export default Surf;
