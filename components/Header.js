import styles from '../styles/Header.module.css';
import { login, logout } from '../reducers/user';
import { Modal } from 'antd';
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faUser, faXmark, faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone  } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip, Input, Password } from 'antd';

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
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const error = null

    const showModalInscription = () => {
        setIsModalVisibleInscription(!isModalVisibleInscription);
    };
    const showModalConnection = () => {
        setIsModalVisibleConnection(!isModalVisibleConnection);
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
        fetch('http://localhost:3000/users/signup',{
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
        fetch('http://localhost:3000/users/signin',{
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
    // const handleLogout = () => {
    //     dispatch(logout());
    // };



    let modalContentInscription;
    if (!user.token) {
        modalContentInscription = (
            <div className={styles.registerContainer}>
                <div className={styles.registerSection}>
                    <p>S'enregistrer</p>
                    <Input type="Prénom" placeholder="Prénom" id="signUpFirstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
                    <Input type="Nom" placeholder="Nom" id="signUpLastname" onChange={(e) => setSignUpLastname(e.target.value)} value={signUpLastname} />
                    <Input type="Nom d'utilisateur" placeholder="Nom d'utilisateur" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
                    <Input type="Email" placeholder="Email" id="Email" onChange={(e) => setSignUpMail(e.target.value)} value={signUpMail} />
                    <Input.Password
       placeholder="Mot de passe" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
                    <Button id="register" onClick={() => handleRegister()}>S'enregistrer</Button>
                </div>
            </div>
        );
    }

    // let userSectionInscription;
    // if (user.token) {
    //     userSectionInscription = (
    //         <div className={styles.logoutSection}>

    //             <button onClick={() => handleLogout()}>Logout</button>
    //         </div>
    //     );
    // } else {
    //     if (isModalVisibleInscription) {
    //         userSectionInscription =
    //             <div className={styles.headerIcons}>
    //                 <FontAwesomeIcon onClick={showModalInscription} className={styles.userSection} icon={faXmark} />
    //             </div>
    //     } else {
    //         userSectionInscription =
    //             <div className={styles.headerIcons}>
    //                 <FontAwesomeIcon onClick={showModalInscription} className={styles.userSection} />
    //             </div>
    //     }
    // }

    let modalContentConnection;
    if (!user.token) {
        modalContentConnection = (
            <div className={styles.registerContainer}>
                <div className={styles.registerSection}>
                    <p>Se connecter</p>
                    <Input type="text" placeholder="Nom d'utilisateur" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
                    <Input.Password
       placeholder="Mot de passe" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
                    <Button id="connection" onClick={() => handleConnection()}>Se connecter</Button>
                </div>
            </div>
        );
    }

    // let userSectionConnection;
    // if (user.token) {
    //     userSectionConnection = (
    //         <div className={styles.logoutSection}>
    //             <button onClick={() => handleLogout()}>Logout</button>
    //         </div>
    //     );
    // } else {
    //     if (isModalVisibleConnection) {
    //         userSectionConnection =
    //             <div className={styles.headerIcons}>
    //                 <FontAwesomeIcon onClick={showModalConnection} className={styles.userSection} icon={faXmark} />
    //             </div>
    //     } else {
    //         userSectionConnection =
    //             <div className={styles.headerIcons}>
    //                 <FontAwesomeIcon onClick={showModalConnection} className={styles.userSection} icon={faUser} />
    //             </div>
    //     }
    // }


    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src="logo.svg" alt="Logo" />
            </div>
            <div className={styles.dropDownContainer}>
            <Dropdown.Button menu={menuProps} placement="bottomRight" icon={<UserOutlined />} > <FontAwesomeIcon icon={faBars} />

                {isModalVisibleInscription && <div id="react-modals">
               
                    <Modal getContainer="#react-modals" className={styles.modal} open={isModalVisibleInscription} closable={false} footer={null}>
                        {modalContentInscription}
                        <FontAwesomeIcon className={styles.userSection} icon={faXmark} />
                    </Modal>
                </div>}

                {isModalVisibleConnection && <div id="react-modals">
                    <Modal getContainer="#react-modals" className={styles.modal} open={isModalVisibleConnection} closable={false} footer={null}>
                        {modalContentConnection}
                        <FontAwesomeIcon className={styles.userSection} icon={faXmark} />
                    </Modal>
                </div>}


            </Dropdown.Button>
            </div>




        </header >
    );
}

export default Header;

