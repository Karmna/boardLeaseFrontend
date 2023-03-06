import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Rent.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { DatePicker, Space, Select, message, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";

function Rent() {
const user = useSelector((state) => state.user.value);
// utilisation de useMediaQuery pour détecter les correspondances d'écran
const matches = useMediaQuery("(min-width:768px)");

const dispatch = useDispatch();
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

// fonction qui gère 
const handleRent = () => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${destination}`)
      .then((response) => response.json())
      .then((data) => {
        const firstCity = data.features[0];

    fetch("http://localhost:3000/surfs/surfs", {
        method: "POST",
        headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            type : type,
            level: level, 
            name: titlePost, 
            dayPrice: dayPrice, 
            // TODO pictures,
            placeName: destination, 
            latitude: firstCity.geometry.coordinates[1],
            longitude: firstCity.geometry.coordinates[0],
            availabilities: { startDate: searchStartDate, endDate: searchEndDate },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
    });
    //On redirige vers une page via UseRouter ?
};

const handleType = (value) => {
    setType(value)
};

const handleLevel = (value) => {
    setLevel(value)
};

// Upload de la photo de l'annonce
const imageProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      setImageFileList(info.file.linkProps);
      console.log(imageFileList)
    },
    maxCount: 1,
  };

const uploadPicture = async () => {
    const formData = new FormData();
    formData.append('photoFromFront',imageFileList);
    fetch('http://localhost:3000/surfs/upload', {
  method: 'POST',
  body: formData,
  }).then((response) => response.json())
  .then((data) => {
    console.log(data);
dispatch(addPhoto(data.url));
});
}

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
      <input
        className={styles.input}
        type="text"
        placeholder="Où sera disponible votre board ?"
        id="destination"
        onChange={(e) => setDestination(e.target.value)}
        value={destination}
      />
      <div className={styles.dateContainer}>
        <Space direction="vertical">
          <DatePicker onChange={handleStartDate} placeholder="Date de début" />
        </Space>
        <Space direction="vertical">
          <DatePicker onChange={handleEndDate} placeholder="Date de fin" />
        </Space>
      </div>


{/*Input pour le titre de l'annonce*/}
      <input
        className={styles.input}
        type="text"
        placeholder="Titre de votre annonce"
        id="titlePost"
        onChange={(e) => setTitlePost(e.target.value)}
        value={titlePost}
      />


    {/*Select pour choisir type de surf*/}
    <div>
    Select pour choisir type de surf
    <Space wrap>
    <Select
      defaultValue="Mon type de surf"
      style={{
        width: 120,
      }}
      onChange={handleType}
      options={[
        {
          value: 'Longboard',
          label: 'Longboard',
        },
        {
          value: 'Shortboard',
          label: 'Shortboard',
        },
        {
          value: 'Fish',
          label: 'Fish',
        },
        {
          value: 'Malibu',
          label: 'Malibu',
        },
      ]}
    />
  </Space>
  </div>


    {/*Select pour choisir level de surf*/}
    <div>
    Select pour choisir level de surf
    <Space wrap>
    <Select
      defaultValue="Le niveau de mon surf"
      style={{
        width: 120,
      }}
      onChange={handleLevel}
      options={[
        {
          value: 'Débutant',
          label: 'Débutant',
        },
        {
          value: 'Intermédiaire',
          label: 'Intermédiaire',
        },
        {
            value: 'Confirmé',
            label: 'Confirmé',
          },
        {
          value: 'Avancé',
          label: 'Avancé',
        },
      ]}
    />
  </Space>
  </div>
<div>
  {/*Input pour le price par day*/}
  <input
        className={styles.input}
        type="Number"
        placeholder="20"
        id="dayPrice"
        onChange={(e) => setDayPrice(e.target.value)}
        value={dayPrice}
      />
       Euros
</div>
{console.log(titlePost, destination, searchStartDate, searchEndDate, level, type, dayPrice)}


<div>
Votre image :
  <Upload {...imageProps}>

    <Button icon={<UploadOutlined />}>Click to Upload (Max : 1)</Button>
  </Upload>
</div>

  {/*Bouton pour envoyer le formulaire*/}
<div>
      <button className={styles.button} onClick={() => handleRent()}>
        Je loue mon surf !
      </button>
    </div>




</div>
    
    
  
);
}


export default Rent;