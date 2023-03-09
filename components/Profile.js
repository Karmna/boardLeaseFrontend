import styles from "../styles/Profile.module.css";
import { Button, Input, Divider, Space, Card, DatePicker } from "antd";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUserProfile } from "../reducers/user";
import { useRouter } from "next/router";

function Profile() {
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [bookings, setBookings] = useState([]);

  const matches = useMediaQuery("(min-width:768px)");

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChange = () => {
    if (!newFirstname && !newLastname && !newUsername && !newEmail) {
      setErrorMsg(
        "Veuillez renseigner au moins un champ pour modifier le profil."
      );
      return;
    }

    fetch("https://board-lease-backend.vercel.app/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        firstname: newFirstname ? newFirstname : user.firstname,
        lastname: newLastname ? newLastname : user.lastname,
        username: newUsername ? newUsername : user.username,
        email: newEmail ? newEmail : user.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            updateUserProfile({
              firstname: data.newFirstname,
              lastname: data.newLastname,
              username: data.newUsername,
              email: data.newEmail,
            })
          );
          setSuccessMsg("Profil modifié !");
          setNewUsername("");
          setNewEmail("");
          setNewFirstname("");
          setNewLastname("");
        } else {
          // TODO afficher erreur dans le DOM avec un état
          console.log(data.error);
          //definir error, error existe pas
        }
      });
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profile}>
        <h3>Profile</h3>
        <br />
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Input
            type="Prénom"
            placeholder={user.firstname}
            id="Firstname"
            value={newFirstname}
            onChange={(e) => setNewFirstname(e.target.value)}
          />
          <Input
            type="Nom"
            placeholder={user.lastname}
            id="Lastname"
            value={newLastname}
            onChange={(e) => setNewLastname(e.target.value)}
          />
          <Input
            type="Nom d'utilisateur"
            placeholder={user.username}
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Input
            type="Email"
            placeholder={user.email}
            id="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />

          <Button
            id="register"
            onClick={(e) => {
              e.preventDefault();
              handleInputChange();
            }}
          >
            Modifier
          </Button>
        </Space>
        {errorMsg && <p>{errorMsg}</p>}
        {successMsg && <p>{successMsg}</p>}
      </div>

      <Divider />
      <div className={styles.BtnContainer}>
        <button
          className={styles.button}
          onClick={() =>
            router.push({
              pathname: "/bookings",
            })
          }
        >
          Réservations
        </button>
        <button
          className={styles.button}
          onClick={() =>
            router.push({
              pathname: "/listings",
            })
          }
        >
          Mes surfs loués
        </button>
      </div>
    </div>
  );
}

export default Profile;
