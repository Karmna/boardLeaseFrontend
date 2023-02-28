import styles from '../styles/Header.module.css';
import { login, logout } from '../reducers/user';
import { Modal } from 'antd';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faUser, faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip, Input, Password } from 'antd';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

function Header() {
    const matches = useMediaQuery('(min-width:468px)')
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [isModalVisibleInscription, setIsModalVisibleInscription] = useState(false);
    const [isModalVisibleConnection, setIsModalVisibleConnection] = useState(false);
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpLastname, setSignUpLastname] = useState('');
    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpMail, setSignUpMail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userGoogle, setUserGoogle] = useState(null);


    const clientId = '755080318307-4oa4og0udgb1vt0s4cd95tto75hcmnqo.apps.googleusercontent.com';

    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const error = null

    const showModalInscription = () => {
        setIsModalVisibleInscription(!isModalVisibleInscription);
    };
    const showModalConnection = () => {
        setIsModalVisibleConnection(!isModalVisibleConnection);
    };

    const handleLogin = (credentialResponse) => {
        setUserGoogle(jwtDecode(credentialResponse.credential));
    };

    const items = [
        {
            label: 'Inscription',
            key: '1',
            icon: <UserOutlined onClick={showModalInscription} />,

        },
        {
            label: 'Connection',
            key: '2',
            icon: <UserOutlined onClick={showModalConnection} />,
        },

    ];

    const handleMenuClick = (e) => {
        console.log('click', e);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    const handleRegister = () => {
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: signUpFirstname, lastname: signUpLastname, username: signUpUsername, email: signUpMail, password: signUpPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: signUpUsername, token: data.token }));
                    setSignUpUsername('');
                    setSignUpPassword('');
                    setSignUpMail('');
                    setSignUpFirstname('');
                    setSignUpLastname('');
                    setIsModalVisibleInscription(false)
                }
                else {
                    error = data.error;
                }
            });
    };

    const handleConnection = () => {
        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signInUsername, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: signInUsername, token: data.token }));
                    setSignInUsername('');
                    setSignInPassword('');
                    setIsModalVisibleConnection(false)
                }
            });

    }


    let modalContentInscription;
    if (!user.token) {
        modalContentInscription = (
            <div className={styles.registerContainer}>
                <GoogleOAuthProvider clientId={clientId}>
                    <div className={styles.container}>
                        {userGoogle ?
                            <div className={styles.content}>
                                <div className={styles.divider}></div>
                                <p>Email: {userGoogle.email}</p>
                            </div>
                            : <div className={styles.content}>
                                <Input type="Prénom" placeholder="Prénom" id="signUpFirstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
                                <Input type="Nom" placeholder="Nom" id="signUpLastname" onChange={(e) => setSignUpLastname(e.target.value)} value={signUpLastname} />
                                <Input type="Nom d'utilisateur" placeholder="Nom d'utilisateur" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
                                <Input type="Email" placeholder="Email" id="Email" onChange={(e) => setSignUpMail(e.target.value)} value={signUpMail} />
                                <Input.Password
                                    placeholder="Mot de passe" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                                <Button id="register" onClick={() => handleRegister()}>S'enregistrer</Button>
                                <h2>Se connecter avec Google</h2>
                                <div className={styles.divider}></div>
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => handleLogin(credentialResponse)}
                                    onError={((error) => console.error(error))}
                                />
                            </div>}
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
                        {userGoogle ?
                            <div className={styles.content}>
                                <div className={styles.divider}></div>
                                <p>Email: {userGoogle.email}</p>
                            </div>
                            :
                            <div className={styles.registerSection}>
                                <Input type="text" placeholder="Nom d'utilisateur" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
                                <Input.Password
                                    placeholder="Mot de passe" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                                <Button id="connection" onClick={() => handleConnection()}>Se connecter</Button>
                                <h2>Se connecter avec Google</h2>
                                <div className={styles.divider}></div>
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => handleLogin(credentialResponse)}
                                    onError={((error) => console.error(error))}
                                />
                            </div>}
                    </div>
                </GoogleOAuthProvider>
            </div>

        );
    }



    return (

        <header className={styles.header}>

            <div className={styles.logoContainer}>
                <img className={styles.logo} src="logo.svg" alt="Logo" />
            </div>

            <div className={styles.dropDownContainer}>
                <Dropdown.Button menu={menuProps} placement="bottomRight" icon={<UserOutlined />} > <FontAwesomeIcon icon={faBars} />
                    <div id="react-modals">

                        <Modal title="Inscription" className={styles.modal} open={isModalVisibleInscription} closable={false} footer={null} >
                            <p>{modalContentInscription}</p>

                        </Modal>

                    </div>

                    <div id="react-modals">
                        <Modal title="Connection" className={styles.modal} open={isModalVisibleConnection} closable={false} footer={null}>
                            <p>{modalContentConnection}</p>
                        </Modal>
                    </div>
                </Dropdown.Button>
            </div>

        </header >
    );
}

export default Header;

