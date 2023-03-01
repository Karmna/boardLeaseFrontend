import styles from "../styles/Profile.module.css";
import { login, logout } from "../reducers/user";
import {
  Button,
  Input, Divider
} from "antd";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

function Profile() {
    const matches = useMediaQuery("(min-width:768px)");

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();


  const [newUsername, setNewUsername] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  

  const handleInputChange = () => {
    fetch("http://localhost:3000/users/modification", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: newFirstname,
        lastname: newLastname,
        username: newUsername,
        email: newEmail,

      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
            dispatch(
              login({
                firstname: data.newFirstname,
                lastname: data.newLastname,
                username: data.newUsername,
                email: data.newEmail,
                favorites: data.favorites,
              })
            );
          setNewUsername("");
          setNewEmail("");
          setNewFirstname("");
          setNewLastname("");
        } else {
          error = data.error;
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

          <Button id="register" onClick={() => handleInputChange()}>
            Modifier
          </Button>
        </div>
      </div>
      <Divider />
      <div className={styles.bookingsContainer}>
        <p>Bookings</p>
        </div>
    </Content>
    <footer>

    </footer>
    </Layout>
  );
}

export default Profile;
