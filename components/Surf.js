import Image from "next/image";
import styles from "../styles/Surf.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Rate } from "antd";
import { useRouter } from "next/router";

function Surf(props) {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");
  const router = useRouter();

  const handleRedirectPost = () => {
    router.push({
      pathname: "/posts",
      query: {
        surfProps: JSON.stringify(props),
      },
    });
  };

  const surfDisplay = !matches ? (
    <div className={styles.card} onClick={() => handleRedirectPost()}>
      <Image
        className={styles.image}
        src={props.pictures[0]}
        alt={props.name}
        width={100}
        height={100}
      />
      <div className={styles.description}>
        <h3 className={styles.name}>{props.name}</h3>

        <p className={styles.level}>Niveau: {props.level}</p>
        <span className={styles.rating}>
          <Rate value={props.rating} />
        </span>
      </div>
    </div>
  ) : (
    <div className={styles.card} onClick={() => handleRedirectPost()}>
      <Image
        src={props.pictures[0]}
        alt={props.name}
        width={120}
        height={120}
      />
      <div className={styles.descriptionContent}>
        <h3 className={styles.name}>{props.name}</h3>

        <p className={styles.description}>
          <u>
            <strong>Niveau:</strong>
          </u>
          &nbsp; {props.level}
        </p>
        <p className={styles.description}>
          Disponible du{" "}
          {new Date(props.availabilities[0].startDate).toLocaleDateString("fr")}{" "}
          au{" "}
          {new Date(props.availabilities[0].endDate).toLocaleDateString("fr")}
        </p>
        <span className={styles.rating}>
          <Rate value={props.rating} />
        </span>
      </div>
      <div className={styles.detailsContent}>
        <p className={styles.detail}>
          <u>
            <strong>Loué par:</strong>
          </u>
          &nbsp; {props.owner}
        </p>
        <p className={styles.detail}>
          <u>
            <strong>De:</strong>
          </u>
          &nbsp; {props.placeName}
        </p>
        <p className={styles.detail}>
          <u>
            <strong>Prix:</strong>
          </u>
          &nbsp; {props.dayPrice} € / jour
        </p>
        <p className={styles.detail}>
          <u>
            <strong>Caution:</strong>
          </u>
          &nbsp; {props.deposit} €
        </p>
      </div>
    </div>
  );

  return <div>{surfDisplay}</div>;
}

export default Surf;
