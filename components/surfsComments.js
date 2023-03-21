import styles from "../styles/SurfsComments.module.css";
import * as ratings from "../data/ratingData";
import { Rate } from "antd";

function SurfsComments() {
  const i = Math.floor(Math.random() * 18 + 1);

  console.log(i);

  return (
    <div className={styles.container}>
      {ratings[`surfRating${i}`].map((props, i) => {
        return (
          <div key={i} className={styles.card}>
            <strong>
              <p>{props.name}</p>
            </strong>
            <p>{props.text}</p>
            <Rate value={props.rating} />
          </div>
        );
      })}
    </div>
  );
}

export default SurfsComments;
