import styles from "../styles/Footer.module.css";
import { faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { Layout } from "antd";
const { Footer, Content, Header } = Layout;

function FooterFunction() {
  const matches = useMediaQuery("(min-width:768px)");

 

  const footerDisplay = !matches ? (
    <Layout>
      <Footer className={styles.footerStyle}>
        <div>
          <Link href="/search">
            <FontAwesomeIcon
              className={styles.useSelector}
              icon={faMagnifyingGlass}
            />
          </Link>
          <p>Explorer</p>
          </div>
          <div>
          <Link href="/favorites">
            <FontAwesomeIcon
              className={styles.useSelector}
              icon={faHeart}
            />
          </Link>
          <p>Favoris</p>
          </div>
      </Footer>
    </Layout>
  ) : (
    <Layout>
      <Footer className={styles.footerStyle}>Footer</Footer>
    </Layout>
  );

  return <div>{footerDisplay}</div>;
}

export default FooterFunction;
