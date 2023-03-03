import styles from "../styles/Rating.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Rate } from "antd";
import { ratingData } from "../data/ratingData";
import Image from "next/image";

function Rating() {
    // Utilisation de useMediaQuery pour détecter les correspondances d'écran
    const matches = useMediaQuery("(min-width:768px)");
    const ratingDisplay = !matches ? (
      <div></div>
    ) : (
      ratingData &&
      ratingData.map((data, i) => (
        <div key={i} className={styles.ratingCard}>
          <div className={styles.avatar}>
            <Image
              className={styles.image}
              src={data.avatar}
              alt={data.name}
              width={200}
              height={200}
            />
            <div className={styles.name}>{data.name}</div>
          </div>
          <div className={styles.text}>
            {data.text}
            <Rate value={data.rating} />
          </div>
        </div>
      ))
    );
    return <div>{ratingDisplay}</div>;
  }
  
  export default Rating;
