import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Rent.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import {
  DatePicker,
  Space,
  Select,
  message,
  Divider,
} from "antd";
import { useRouter } from "next/router";

// Import de la fonction dynamique de Next.js permettant de charger un composant de manière asynchrone
import dynamic from "next/dynamic";

const UploadWidget = dynamic(() => import("./UploadWidget"), {
  ssr: false, // Empêche le rendu côté serveur (server-side rendering)
});


function Rent() {
  const user = useSelector((state) => state.user.value);
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");

  const [titlePost, setTitlePost] = useState("");
  const [destination, setDestination] = useState("");
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [dayPrice, setDayPrice] = useState("");
  const [imageFileList, setImageFileList] = useState("");
  const router = useRouter();


// fonction qui gére la selection des dates début / fin et set l'état.
  const handleStartDate = (date, dateString) => {
    setSearchStartDate(dateString);
  };
  const handleEndDate = (date, dateString) => {
    setSearchEndDate(dateString);
  };


/* fonction qui gère une fois qu'on clique sur "je publie mon annonce" 
le geo coding pour recup long et lat en fonction de la location*/ 
  const handleRent = () => {
//Si pas de location renseignée on affiche msg error
    if (!destination) {
      message.error("Oups ! Veuillez renseigner une location svp.");
      return
    }
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${destination}`)
      .then((response) => response.json())
      .then((data) => {
      const firstCity = data.features[0];

/*et ensuite créé le surf en BDD*/
        fetch("http://localhost:3000/surfs/surfs", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: type,
            level: level,
            name: titlePost,
            dayPrice: dayPrice,
            pictures: imageFileList,
            placeName: destination,
            latitude: firstCity.geometry.coordinates[1],
            longitude: firstCity.geometry.coordinates[0],
            availabilities: {
              startDate: searchStartDate,
              endDate: searchEndDate,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.result) {
              message.success("Votre annonce vient d'être postée, merci !");
              setTitlePost("");
              setDestination("");
              setDayPrice("");
            } else {
              message.error("Oups ! Veuillez recommencer svp.");
            }
          });
      });
    //On redirige vers une page via UseRouter ?
  };

  const handleType = (value) => {
    setType(value);
  };

  const handleLevel = (value) => {
    setLevel(value);
  };

  const handleUploadImage = (imageUrl) => {
    setImageFileList(imageUrl);
  }
console.log("Image URl", imageFileList);


  return (
    <div className={styles.content}>
      <div className={styles.textContainer}>
        <h1 className={styles.h1}>Louer votre surf !</h1>
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

      {/*Input pour le titre de l'annonce*/}
      <div className={styles.containerTitle}>
        <span>Choisir le titre de votre annonce :</span>
        <input
          className={styles.inputTitle}
          type="text"
          placeholder="Je loue mon surf.."
          id="titlePost"
          onChange={(e) => setTitlePost(e.target.value)}
          value={titlePost}
        />
      </div>

      {/*Input pour renseigner la localité*/}
      <div className={styles.containerDestination}>
        <span>Où sera disponible votre board ?</span>
        <input
          className={styles.inputDestination}
          type="text"
          placeholder="Lacanau, Hossegor.."
          id="destination"
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
        />
      </div>
      <Divider />
      {/*startDate et endDate*/}
      <div className={styles.dateContainer}>
        <span>Renseigner vos dates de disponibilité :</span>
        <div className={styles.startDate}>
          <Space direction="vertical">
            <DatePicker
              onChange={handleStartDate}
              placeholder="Date de début"
            />
          </Space>
        </div>
        <div className={styles.endDate}>
          <Space direction="vertical">
            <DatePicker onChange={handleEndDate} placeholder="Date de fin" />
          </Space>
        </div>
      </div>
      <Divider />
      {/*Select pour choisir type de surf*/}
      <div className={styles.selectType}>
        <span>Quel est le type de votre board ?</span>
        <Space wrap>
          <Select
            defaultValue="Mon type de surf"
            style={{
              width: 120,
            }}
            onChange={handleType}
            options={[
              {
                value: "disabled",
                label: "Choisir mon type :",
                disabled: true,
              },
              {
                value: "Longboard",
                label: "Longboard",
              },
              {
                value: "Shortboard",
                label: "Shortboard",
              },
              {
                value: "Fish",
                label: "Fish",
              },
              {
                value: "Funboard",
                label: "Funboard",
              },
              {
                value: "StandUp Paddle",
                label: "StandUp Paddle",
              },
            ]}
          />
        </Space>
      </div>

      {/*Select pour choisir level de surf*/}
      <div className={styles.selectLevel}>
        <span>Quel niveau correspond à votre board ?</span>
        <Space wrap>
          <Select
            defaultValue="Le niveau de mon surf"
            style={{
              width: 120,
            }}
            onChange={handleLevel}
            options={[
              {
                value: "disabled",
                label: "Choisir le niveau de mon surf :",
                disabled: true,
              },
              {
                value: "Débutant",
                label: "Débutant",
              },
              {
                value: "Intermédiaire",
                label: "Intermédiaire",
              },
              {
                value: "Confirmé",
                label: "Confirmé",
              },
            ]}
          />
        </Space>
      </div>
      <div>
        {/*Input pour le price par day*/}
        <div className={styles.containerPrice}>
          <span>Prix /jour en euros :</span>
          <input
            className={styles.inputPrice}
            type="Number"
            placeholder="20"
            id="dayPrice"
            onChange={(e) => setDayPrice(e.target.value)}
            value={dayPrice}
          />
        </div>
      </div>
      {console.log(
        titlePost,
        destination,
        searchStartDate,
        searchEndDate,
        level,
        type,
        dayPrice
      )}

      <div className={styles.containerUpload}>
        Une image représentant votre board :
      <UploadWidget handleUploadImage={handleUploadImage}/>
      </div>

      {/*Bouton pour envoyer le formulaire*/}
      <div>
        <button className={styles.button} onClick={() => handleRent()}>
          Je publie mon annonce
        </button>
      </div>
    </div>
  );
}

export default Rent;
