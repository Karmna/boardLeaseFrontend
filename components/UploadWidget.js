import { useEffect, useRef } from "react";
import styles from "../styles/Rent.module.css";
import {
    message,
  } from "antd";

function UploadWidget(props) {
    const cloudinaryRef = useRef ();
    const widgetRef = useRef ();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dfaran6xi',
            uploadPreset: 'ywuk0kfk',
        }, 
        function(error, result){
            if (result.event == 'success') {
            message.success("Votre image vient d'être ajoutée.");
            props.handleUploadImage(result.info.secure_url)
        } else if  (error) {
            message.error("Oups, le format ne convient pas.. Veuillez recommencer svp.");
        }
        });
    }, [])
return (
    <button className={styles.uploadButton} onClick={() => widgetRef.current.open()}>
    Click to Upload
    </button>
)
}

export default UploadWidget;