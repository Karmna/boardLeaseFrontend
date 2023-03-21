import { Space } from "antd";
import styles from "../styles/About.module.css";
import Image from "next/image";
import aboutImg from "../public/about.jpg";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <Image
        className={styles.images}
        src={aboutImg}
        alt="Sophie is surfing on her new surf rented on board.lease"
      />
      <h6 className={styles.h6}>
        "Avec Board Lease, louez une planche en toute simplicité, et profitez
        d'une session de surf de qualité !"
      </h6>

      <div className={styles.aboutText}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <br />
          <h2>A propos de nous </h2>
          <p>
            Board Lease est une plateforme en ligne qui permet aux surfeurs de
            louer leur planche à d'autres passionnés pour des sessions
            inoubliables. Le concept est simple : les propriétaires de planches
            de surf s'inscrivent sur la plateforme et y proposent leur matériel
            à la location. Les locataires peuvent ensuite consulter les annonces
            et réserver la planche qui convient le mieux à leur niveau et à leur
            pratique. Cette nouvelle solution de location de surf offre
            plusieurs avantages.
            <br />
            <br />
            Tout d'abord, elle permet aux surfeurs de rentabiliser leur
            investissement en mettant leur matériel à disposition d'autres
            personnes lorsqu'ils ne l'utilisent pas. Cela peut être
            particulièrement intéressant pour les surfeurs qui ont investi dans
            une planche haut de gamme et qui souhaitent éviter de la laisser
            prendre la poussière dans un coin.
            <br />
            <br />
            D'un autre côté, les locataires ont la possibilité de tester
            différents types de planches de surf sans avoir à en acheter une.
            Cela leur permet également de s'essayer à des modèles plus
            performants ou mieux adaptés à leur niveau, sans avoir à investir
            des sommes importantes.
          </p>
          <h2> Contactez nous </h2>
          <p> Par email, via contact@boardlease.com</p>
          <p> Par téléphone, au +33 6 02 99 65 87</p>
        </Space>
      </div>
    </div>
  );
}

export default About;
