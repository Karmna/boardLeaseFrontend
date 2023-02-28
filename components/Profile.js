import styles from "../styles/Profile.module.css";

function Profile() {



  return (
<div className={styles.profileContainer}>
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
</div>
  );
  
}

export default Profile;