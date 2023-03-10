import { useEffect, useRef } from "react";
import styles from "../styles/Rent.module.css";

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
            props.handleUploadImage(result.info.secure_url)
        }
        });
    }, [])
return (
    <button className={styles.uploadButton} onClick={() => widgetRef.current.open()}>
        Upload
    </button>
)
}

export default UploadWidget;