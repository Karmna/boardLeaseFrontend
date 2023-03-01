import styles from "../styles/Header.module.css";
import { login, logout } from "../reducers/user";
import { Modal } from "antd";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  faUser,
  faXmark,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DownOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  message,
  Space,
  Tooltip,
  Input,
  Password,
} from "antd";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isModalVisibleInscription, setIsModalVisibleInscription] =
    useState(false);
  const [isModalVisibleConnection, setIsModalVisibleConnection] =
    useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpLastname, setSignUpLastname] = useState("");
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpMail, setSignUpMail] = useState("");
  const [userGoogle, setUserGoogle] = useState(null);

  const clientId =
    "755080318307-4oa4og0udgb1vt0s4cd95tto75hcmnqo.apps.googleusercontent.com";

  const [signInUserEmail, setSignInUserEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const showModalInscription = () => {
    setIsModalVisibleInscription(!isModalVisibleInscription);
  };
  const showModalConnection = () => {
    setIsModalVisibleConnection(!isModalVisibleConnection);
  };

  const handleLogin = (credentialResponse) => {
    console.log(jwtDecode(credentialResponse.credential));

    fetch("http://localhost:3000/users/gverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: credentialResponse.credential,
        authMethod: "google",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    setUserGoogle(jwtDecode(credentialResponse.credential));
  };

  const menuPropsNotConnected = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={showModalInscription}
        >
          Inscription
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={showModalConnection}
        >
          Connection
        </a>
      ),
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };
  const menuPropsConnected = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
          Déconnection
        </a>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const menuProps = {
    items: user.token ? menuPropsConnected : menuPropsNotConnected,
    onClick: handleMenuClick,
  };

  const handleSignup = (authMethod, googleCredentialResponse = null) => {
    console.log(authMethod);

    if (authMethod !== "classic" && authMethod !== "googleConnect") {
      console.error("Unknown auth method");
      return;
    }

    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authMethod, // pour que le backend puisse traiter l'auth selon si google ou non
        googleCredentialResponse, // null if classic auth is used
        firstname: signUpFirstname, // undefined if googleConnect is used
        lastname: signUpLastname, // undefined if googleConnect is used
        username: signUpUsername, // undefined if googleConnect is used
        email: signUpMail, // undefined if googleConnect is used
        password: signUpPassword, // undefined if googleConnect is used
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            login({
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.username,
              email: data.email,
              token: data.token,
              favorites: data.favorites,
            })
          );
          setSignUpUsername("");
          setSignUpPassword("");
          setSignUpMail("");
          setSignUpFirstname("");
          setSignUpLastname("");
          setIsModalVisibleInscription(false);
        } else {
          console.error(data.error);
        }
      });
    // } else if (authMethod === "googleConnect") {
    //   fetch("http://localhost:3000/users/gverify", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       token: credentialResponse.credential,
    //       authMethod,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    // } else {
    //   console.error("Unknown auth method");
    // }
  };

  const handleSignin = (authMethod, googleCredentialResponse) => {
    if (authMethod !== "classic" && authMethod !== "googleConnect") {
      console.error("Unknown auth method");
      return;
    }

    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authMethod, // pour que le backend puisse traiter l'auth selon si google ou non
        googleCredentialResponse, // undefined if classic auth is used
        email: signInUserEmail, // undefined if googleConnect is used
        password: signInPassword, // undefined if googleConnect is used
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            login({
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.username,
              email: data.email,
              token: data.token,
              favorites: data.favorites,
            })
          );
          setSignInUserEmail("");
          setSignInPassword("");
          setIsModalVisibleConnection(false);
        }
      });
    // } else if (authMethod === "googleConnect") {
    //   fetch("http://localhost:3000/users/gverify", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       token: credentialResponse.credential,
    //       authMethod,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    // } else {
    //   console.error("Unknown auth method");
    // }
  };

  let modalContentInscription;
  if (!user.token) {
    modalContentInscription = (
      <div className={styles.registerContainer}>
        <GoogleOAuthProvider clientId={clientId}>
          <div className={styles.container}>
            {userGoogle ? (
              <div className={styles.content}>
                {/* <div className={styles.divider}></div> */}
                <p>Bienvenu {userGoogle.username} chez Board.Lease </p>
              </div>
            ) : (
              <div className={styles.content}>
                <Input
                  type="Prénom"
                  placeholder="Prénom"
                  id="signUpFirstname"
                  onChange={(e) => setSignUpFirstname(e.target.value)}
                  value={signUpFirstname}
                />
                <Input
                  type="Nom"
                  placeholder="Nom"
                  id="signUpLastname"
                  onChange={(e) => setSignUpLastname(e.target.value)}
                  value={signUpLastname}
                />
                <Input
                  type="Nom d'utilisateur"
                  placeholder="Nom d'utilisateur"
                  id="signUpUsername"
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  value={signUpUsername}
                />
                <Input
                  type="Email"
                  placeholder="Email"
                  id="Email"
                  onChange={(e) => setSignUpMail(e.target.value)}
                  value={signUpMail}
                />
                <Input.Password
                  placeholder="Mot de passe"
                  id="signUpPassword"
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  value={signUpPassword}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                <Button id="register" onClick={() => handleSignup("classic")}>
                  S'enregistrer
                </Button>
                <h2>Se connecter avec Google</h2>
                <div className={styles.divider}></div>
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    handleSignup("googleConnect", credentialResponse)
                  }
                  onError={(error) => console.error(error)}
                />
              </div>
            )}
          </div>
        </GoogleOAuthProvider>
      </div>
    );
  }

  let modalContentConnection;
  if (!user.token) {
    modalContentConnection = (
      <div className={styles.registerContainer}>
        <GoogleOAuthProvider clientId={clientId}>
          <div className={styles.container}>
            {userGoogle ? (
              <div className={styles.content}>
                <div className={styles.divider}></div>
                <p> Bonjour {userGoogle.name}</p>
              </div>
            ) : (
              <div className={styles.registerSection}>
                <Input
                  type="text"
                  placeholder="email"
                  id="signInUserEmail"
                  onChange={(e) => setSignInUserEmail(e.target.value)}
                  value={signInUserEmail}
                />
                <Input.Password
                  placeholder="Mot de passe"
                  id="signInPassword"
                  onChange={(e) => setSignInPassword(e.target.value)}
                  value={signInPassword}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                <Button id="connection" onClick={() => handleSignin("classic")}>
                  Se connecter
                </Button>
                <h2>Se connecter avec Google</h2>
                <div className={styles.divider}></div>
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    handleSignin("googleConnect", credentialResponse)
                  }
                  onError={(error) => console.error(error)}
                />
              </div>
            )}
          </div>
        </GoogleOAuthProvider>
      </div>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Dropdown
          className={styles.dropDownMenu}
          menu={menuProps}
          placement="bottomRight"
        >
          <a onClick={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faBars} />
          </a>
        </Dropdown>

        <img className={styles.logo} src="logo.svg" alt="Logo" />

        <Dropdown
          className={styles.dropDown}
          menu={menuProps}
          placement="bottomRight"
        >
          <a onClick={(e) => e.preventDefault()}>
            <FontAwesomeIcon icon={faUser} />
          </a>
        </Dropdown>
        {user.token && <p>Bienvenue {user.firstname}</p>}
      </div>
      <div>
        <div id="react-modals">
          <Modal
            title="Inscription"
            className={styles.modal}
            open={isModalVisibleInscription}
            closable={false}
            footer={null}
          >
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setIsModalVisibleInscription(false)}
            />
            <div>{modalContentInscription}</div>
          </Modal>
        </div>

        <div>
          <div id="react-modals">
            <Modal
              title="Connection"
              className={styles.modal}
              open={isModalVisibleConnection}
              closable={false}
              footer={null}
            >
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setIsModalVisibleConnection(false)}
              />
              <div>{modalContentConnection}</div>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
