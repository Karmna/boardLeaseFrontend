import styles from "../styles/Header.module.css";
import { login, logout } from "../reducers/user";
import { Divider, Modal } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faUser, faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Dropdown, Input, Space } from "antd";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Layout } from "antd";
const { Header } = Layout;
import Image from "next/image";
import Logo from "../public/Logo.svg";

function HeaderF() {
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

  const clientId = process.env.CLIENT_ID;
  const matches = useMediaQuery("(min-width:768px)");
  const [signInUserEmail, setSignInUserEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const showModalInscription = () => {
    setIsModalVisibleInscription(!isModalVisibleInscription);
  };
  const showModalConnection = () => {
    setIsModalVisibleConnection(!isModalVisibleConnection);
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

  // TODO : vérifier si googleConnect ne doit pas être déconnecté d'une façon spécifique
  const handleLogout = () => {
    dispatch(logout());
  };
  const menuPropsConnected = [
    {
      key: "1",
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "2",
      label: <Link href="/profile">Bookings</Link>,
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
          Déconnection
        </a>
      ),
    },
  ];

  const menuBar = [
    {
      key: "1",
      label: <Link href="/">Menu</Link>,
    },
    {
      key: "2",
      label: <Link href="/about">A propos</Link>,
    },
    {
      key: "3",
      label: <Link href="/search">Réserver</Link>,
    },
    {
      key: "4",
      label: (
        <div>
          {" "}
          <Divider style={{ margin: 0 }} />{" "}
          <Space style={{ padding: 8 }}>
            <Button href="/rent" type="primary">
              Poster mon surf !
            </Button>
          </Space>{" "}
        </div>
      ),
    },
  ];
  const menuPropsBar = {
    items: menuBar,
    onClick: handleMenuClick,
  };

  const handleMenuClick = (e) => {
    console.log("click", e);
  };

  const menuProps = {
    items: user.token ? menuPropsConnected : menuPropsNotConnected,
    onClick: handleMenuClick,
  };

  const resetForms = () => {
    setSignUpUsername("");
    setSignUpPassword("");
    setSignUpMail("");
    setSignUpFirstname("");
    setSignUpLastname("");

    setSignInUserEmail("");
    setSignInPassword("");
  };

  const handleCloseModal = () => {
    // TODO : add onCloseModal (errorclear, form reset, modal not visible)
    resetForms();
    setErrorMsg("");
    setIsModalVisibleInscription(false);
    setIsModalVisibleConnection(false);
  };

  const handleSignup = (authMethod, googleCredentialResponse = null) => {
    setErrorMsg("");

    if (authMethod !== "classic" && authMethod !== "googleConnect") {
      console.error("Unknown auth method");
      return;
    }

    fetch("https://board-lease-backend.vercel.app/users/signup", {
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
        // Cas 1 : backend renvoit une erreur (result: false)
        if (data.result === false) {
          console.log(data); // TODO display error
          setErrorMsg(data.error);
        } else if (data.jwtToken) {
          try {
            console.log(data);
            const decoded = jwt_decode(data.jwtToken);
            console.log(decoded);

            if (decoded.email) {
              dispatch(
                login({
                  authMethod: decoded.authMethod,
                  firstname: decoded.firstname,
                  lastname: decoded.lastname,
                  username: decoded.username,
                  email: decoded.email,
                  token: data.jwtToken,
                  favorites: decoded.favorites,
                })
              );

              // Reset on success uniquement (pour ne pas devoir tout retaper en cas d'échec)
              handleCloseModal();
            } else {
              setErrorMsg("Problem with JWT : email not found.");
            }
          } catch (error) {
            setErrorMsg(error);
          }
        }
      });
  };

  const handleSignin = (authMethod, googleCredentialResponse) => {
    setErrorMsg("");
    if (authMethod !== "classic" && authMethod !== "googleConnect") {
      console.error("Unknown auth method");
      return;
    }

    fetch("https://board-lease-backend.vercel.app/users/signin", {
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
        // Cas 1 : backend renvoit une erreur (result: false)
        if (data.result === false) {
          console.log(data); // TODO display error
          setErrorMsg(data.error);
        }
        // cas 2 : backend renvoit le JWT
        else if (data.jwtToken) {
          try {
            console.log(data);
            const decoded = jwt_decode(data.jwtToken);
            console.log(decoded);

            if (decoded.email) {
              dispatch(
                login({
                  authMethod: decoded.authMethod,
                  firstname: decoded.firstname,
                  lastname: decoded.lastname,
                  username: decoded.username,
                  email: decoded.email,
                  token: data.jwtToken,
                  favorites: decoded.favorites,
                })
              );

              // Reset on success uniquement (pour ne pas devoir tout retaper en cas d'échec)
              handleCloseModal();
            } else {
              setErrorMsg("Problem with JWT : email not found.");
              console.error("Problem with JWT : email not found.");
            }
          } catch (error) {
            setErrorMsg(error);
          }
        }
      });
  };

  let modalContentInscription;
  if (!user.token) {
    modalContentInscription = (
      <div className={styles.registerContainer}>
        <GoogleOAuthProvider clientId={clientId}>
          <div className={styles.container}>
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
                  handleSignup("googleConnect", credentialResponse.credential)
                }
                onError={(error) => setErrorMsg(error)}
              />
              {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            </div>
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
                  handleSignin("googleConnect", credentialResponse.credential)
                }
                onError={(error) => console.error(error)}
              />
              {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            </div>
          </div>
        </GoogleOAuthProvider>
      </div>
    );
  }
  const footerDisplay = !matches ? (
    <div>
      <Header className={styles.headerStyle}>
        <Dropdown
          className={styles.dropDown}
          menu={menuPropsBar}
          placement="bottomRight"
        >
          <div className={styles.useSelector}>
            <FontAwesomeIcon size="xl" icon={faBars} />
          </div>
        </Dropdown>

        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              className={styles.logo}
              src={Logo}
              width={48}
              height={48}
              alt="Logo"
            />
          </Link>
        </div>

        <Dropdown
          className={styles.dropDown}
          menu={menuProps}
          placement="bottomRight"
        >
          <div>
            <div
              className={
                user.token
                  ? styles.userContainer
                  : styles.userContainerDisconnected
              }
            >
              {user.token && (
                <div className={styles.userName}>
                  Bienvenue, {user.firstname}
                </div>
              )}
              <FontAwesomeIcon
                className={styles.useSelector}
                size="lg"
                icon={faUser}
              />
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
                  <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
                  <div>{modalContentInscription}</div>
                </Modal>
                <Modal
                  title="Connection"
                  className={styles.modal}
                  open={isModalVisibleConnection}
                  closable={false}
                  footer={null}
                >
                  <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
                  <div>{modalContentConnection}</div>
                </Modal>
              </div>
            </div>
          </div>
        </Dropdown>
      </Header>
    </div>
  ) : (
    <Header className={styles.headerStyleDesktop}>
      <Dropdown
        className={styles.dropDown}
        menu={menuPropsBar}
        placement="bottomRight"
      >
        <FontAwesomeIcon className={styles.useSelector} icon={faBars} />
      </Dropdown>
      <Link href="/">
        <img className={styles.logo} src="logo.png" alt="Logo" />
      </Link>
      <Dropdown
        className={styles.dropDown}
        menu={menuProps}
        placement="bottomRight"
      >
        <div>
          <div>
            <FontAwesomeIcon className={styles.useSelector} icon={faUser} />
            {user.token && <p className={styles.userName}> {user.firstname}</p>}
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
                <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
                <div>{modalContentInscription}</div>
              </Modal>
              <Modal
                title="Connection"
                className={styles.modal}
                open={isModalVisibleConnection}
                closable={false}
                footer={null}
              >
                <FontAwesomeIcon icon={faXmark} onClick={handleCloseModal} />
                <div>{modalContentConnection}</div>
              </Modal>
            </div>
          </div>
        </div>
      </Dropdown>
    </Header>
  );

  return <div>{footerDisplay}</div>;
}

export default HeaderF;
