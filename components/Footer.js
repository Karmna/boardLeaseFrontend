import styles from "../styles/Footer.module.css";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;


// test deploy

function FooterFunction() {
  const matches = useMediaQuery("(min-width:768px)");

  const footerDisplay = !matches ? (
   
      <footer className={styles.footerStyle}>
        <div className={styles.footerlogoExplore}>
          <Link href="/explorer">
            <FontAwesomeIcon
              className={styles.useSelector}
              icon={faMagnifyingGlass}
            />
          </Link>
          <br/>
          <br/>
          <p>Explorer</p>
        </div>
        <div className={styles.footerlogoCoeur}>
          <Link href="/favorites">
            <FontAwesomeIcon className={styles.useSelector} icon={faHeart} />
          </Link>
          <br/>
          <br/>
          <p>Favoris</p>
        </div>
      </footer>
    
  ) : (
   
      <Footer className={styles.footerStyleDesktop}>
        <div>
          <p>
            Merci de noter qu'une caution sera exigée pour toute location de
            matériel, qui sera utilisée en cas de casse. Consultez nos
            conditions générales de location pour plus de détails
          </p>
        </div>
        <div className={styles.footerDesktopLink}>
          <p>Mentions Légales</p>
          <p>CGV</p>
          <p>Politique de confidentialité</p>
          <p> Gestion des cookies</p>
          <p> Nous contacter</p>
        </div>
      </Footer>
    
  );

  return <div>{footerDisplay}</div>;
}

export default FooterFunction;
