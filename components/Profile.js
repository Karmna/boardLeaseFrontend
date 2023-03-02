import styles from "../styles/Profile.module.css";
import { login, logout, updateUserProfile } from "../reducers/user";
import { Button, Input, Divider } from "antd";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout} from "antd";
const { Header, Content, Footer } = Layout;

function Profile() {
  const matches = useMediaQuery("(min-width:768px)");

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = () => {
    if (!newFirstname && !newLastname && !newUsername && !newEmail) {
      setErrorMsg(
        "Veuillez renseigner au moins un champ pour modifier le profil."
      );
      return;
    }
    // if(!newFirstname) newFirstname = user.firstname;
    // if(!newLastname) newFirstname = user.firstname;
    // if(!newUsername) newFirstname = user.firstname;
    // if(!newEmail) newFirstname = user.firstname;
    fetch("http://localhost:3000/users", {
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
    <Layout>
      <Content className={styles.profilePage}>
        <div className={styles.profile}>
          <p>Profile</p>
          <div className={styles.Input}>
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
          </div>
          {errorMsg && <p>{errorMsg}</p>}
          {successMsg && <p>{successMsg}</p>}
        </div>
        <Divider />
        <div className={styles.bookingsContainer}>
          <p>Bookings</p>
        </div>
      </Content>
      <footer></footer>
    </Layout>
  );
}

export default Profile;
