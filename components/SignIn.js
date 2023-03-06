import styles from "../styles/SignIn.module.css";

import { login } from "../reducers/user";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Input, Divider, Space } from 'antd'; 
import * as React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";


function SignIn() {  

  const clientId = process.env.CLIENT_ID;
  const dispatch = useDispatch();
  const [signInUserEmail, setSignInUserEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  
  
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
              router.push({
                pathname: "/booking",
              });
              
            } else {
              setErrorMsg("Problem with JWT : email not found.");
              console.error("Problem with JWT : email not found.");
            }
          } catch (error) {
            setErrorMsg(error);
            console.error(error); // TODO display error
          }
        }
      });
  };


  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.title}> Connection </h1>
      <br />
        <GoogleOAuthProvider clientId={clientId}>
          <div className={styles.container}>
            <div className={styles.registerSection}>
            <Space direction="vertical" size="middle" style={{ display: "flex" }}>
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
              <button className={styles.button} id="connection" onClick={() => handleSignin("classic")}>
                Se connecter
              </button>
              </Space>
              <Divider>Se connecter avec :</Divider>
              <div className={styles.divider}></div>
              <GoogleLogin 
                onSuccess={(credentialResponse) =>
                  handleSignin("googleConnect", credentialResponse.credential)
                }
                onError={(error) => console.error(error)}
              />
             
              {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>} 
             
            </div>
          </div>
        </GoogleOAuthProvider>
      </div>
  );
}

export default SignIn;