import styles from "../styles/SignUp.module.css";
import { login } from "../reducers/user";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Divider, Space } from "antd";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

function SignUp() {
  const dispatch = useDispatch();
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpLastname, setSignUpLastname] = useState("");
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpMail, setSignUpMail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const clientId = process.env.CLIENT_ID;
  const router = useRouter();

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
          // errorMsg = data.error;
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
              router.push({
                pathname: "/booking",
              });
            } else {
              setErrorMsg("Problem with JWT : email not found.");

              // console.error("Problem with JWT : email not found.");
            }
          } catch (error) {
            setErrorMsg(error);

            console.error(error); // TODO display error
          }
        }
      });
  };

  const handleRedirectConnection = () => {
    router.push({
      pathname: "/signIn",
    });
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.title}> Inscription </h1>
      <br />
      <GoogleOAuthProvider clientId={clientId}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
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

              <button
                className={styles.button}
                id="register"
                onClick={() => handleSignup("classic")}
              >
                S'enregistrer
              </button>
            </Space>
            <Divider>S'inscrire avec :</Divider>
            <br />
            <div className={styles.divider}></div>
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handleSignup("googleConnect", credentialResponse.credential)
              }
              onError={(error) => setErrorMsg(error)}
            />
            {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
          </div>
        </div>
      </GoogleOAuthProvider>
      <Divider>OU</Divider>
      <br />
      <button
        className={styles.button}
        id="connection"
        onClick={() => handleRedirectConnection()}
      >
        Se connecter
      </button>
      <br />
      <br />
    </div>
  );
}

export default SignUp;
