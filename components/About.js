import styles from "../styles/Profile.module.css";



import { Layout} from "antd";
const { Content} = Layout;

function About() {
  return (
   
      <Content className={styles.profilePage}>
    <div>
        <div className={styles.images}>
        <img className={styles.images} src="images-1.jpg" alt="Logo" />
        </div>
      <h1> Notre mission</h1>
      <p>
        En somme, cette nouvelle plateforme de location de surf entre
        particuliers est une excellente initiative pour les surfeurs, qui leur
        permet de vivre pleinement leur passion tout en faisant des économies et
        en préservant l'environnement. Nul doute qu'elle rencontrera un grand
        succès auprès des amoureux de la glisse !
      </p>
      <h1>A propos</h1>
      <p>
        Board.Lease est une plateforme en ligne permet aux surfeurs de louer
        leur planche à d'autres passionnés pour des sessions inoubliables. Le
        concept est simple : les propriétaires de planches de surf s'inscrivent
        sur la plateforme et y proposent leur matériel à la location. Les
        locataires peuvent ensuite consulter les annonces et réserver la planche
        qui convient le mieux à leur niveau et à leur pratique. Cette nouvelle
        solution de location de surf offre plusieurs avantages. Tout d'abord,
        elle permet aux surfeurs de rentabiliser leur investissement en mettant
        leur matériel à disposition d'autres personnes lorsqu'ils ne l'utilisent
        pas. Cela peut être particulièrement intéressant pour les surfeurs qui
        ont investi dans une planche haut de gamme et qui souhaitent éviter de
        la laisser prendre la poussière dans un coin. D'un autre côté, les
        locataires ont la possibilité de tester différents types de planches de
        surf sans avoir à en acheter une à chaque fois. Cela leur permet
        également de s'essayer à des modèles plus performants ou mieux adaptés à
        leur niveau, sans avoir à investir des sommes importantes.
      </p>
      <h1>Communauté</h1>
      <p>
      En plus de cela, ce nouveau service favorise la communauté de surfeurs en
      permettant des échanges et des rencontres entre passionnés. Les
      propriétaires peuvent ainsi transmettre leur savoir-faire et leur
      expérience aux locataires, et ces derniers peuvent découvrir de nouveaux
      spots de surf ou apprendre de nouvelles techniques.</p>
    </div>
    </Content>
    
  );
}

export default About;
