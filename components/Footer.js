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
          <Link href="/search">
            <FontAwesomeIcon
              className={styles.useSelector}
              icon={faMagnifyingGlass}
            />
          </Link>
          <Link href="/search">
            <FontAwesomeIcon
              className={styles.useSelector}
              icon={faHeart}
            />
          </Link>
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
