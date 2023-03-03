import Image from "next/image";
import styles from "../styles/Surf.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateFavorites, removeFromFavorites } from "../reducers/favorites";
import { selectedSurf } from "../reducers/post";
import { useRouter } from "next/router";

function Surf(props) {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const favorites = useSelector((state) => state.favorites.value);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (favorites.find((favorite) => favorite._id === props._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites]);

  const handleFavorite = () => {
    fetch(`https://board-lease-backend.vercel.app/surfs/addFavorite/${props._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(updateFavorites(data.data));
        }
      });
  };

  const handleRedirectPost = () => {
    dispatch(selectedSurf(props))
    router.push("/posts");
  }

  let iconStyle = { color: "#eeeee4" };
  if (isFavorite) {
    iconStyle = { color: "#060c5c" };
  }

  const surfDisplay = !matches ? (
    <div className={styles.card} >
      <Image
        className={styles.image}
        src={props.pictures[0]}
        alt={props.name}
        width={100}
        height={100}
      />
      <div className={styles.description}>
        <div className={styles.title}>
          <h3 className={styles.name}>{props.name}</h3>
          <FontAwesomeIcon className={styles.favoriteIcon} icon={faStar} style={iconStyle} onClick={() => handleFavorite()} />
        </div>
        <p className={styles.level}>Niveau: {props.level}</p>
        <span className={styles.rating}>
          <Rate value={props.rating} />
        </span>
      </div>
      <button onClick= {() => handleRedirectPost()}/>
    </div>
  ) : (
    <div className={styles.card}>
      <Image
        src={props.pictures[0]}
        alt={props.name}
        width={120}
        height={120}
      />
      <div className={styles.descriptionContent}>
        <div className={styles.title}>
          <h3 className={styles.name}>{props.name}</h3>
          <FontAwesomeIcon
            className={styles.favoriteIcon}
            icon={faStar}
            style={iconStyle}
            onClick={() => handleFavorite()}
          />
        </div>
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
      <button onClick= {() => handleRedirectPost()}/>
    </div>
  );

  return <div>{surfDisplay}</div>;
}

export default Surf;
