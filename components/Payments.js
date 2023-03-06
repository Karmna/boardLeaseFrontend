import styles from "../styles/Payments.module.css";
import { Input, Divider, Space, Card } from "antd";
import { useState } from "react";

function Payments() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [crypto, setCrypto] = useState("");

  return (
    <div className={styles.paymentsContainer}>
      <h1> Paiement </h1>
      <br />
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Input
          type="Numéro de carte"
          placeholder="Numéro de carte"
          id="cardsNumber"
          onChange={(e) => setCardNumber(e.target.value)}
          value={cardNumber}
        />
        <Input
          type="Nom"
          placeholder="Nom"
          id="name"
          onChange={(e) => setCardName(e.target.value)}
          value={cardName}
        />
        <Input
          type="Date d'expiration"
          placeholder="Date d'expiration"
          id="expiredDate"
          onChange={(e) => setExpiredDate(e.target.value)}
          value={expiredDate}
        />
        <Input
          type="Crypto"
          placeholder="Crypto"
          id="Crypto"
          onChange={(e) => setCrypto(e.target.value)}
          value={crypto}
        />{" "}
      </Space>
      <Divider />
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card title="Conditions d’annulation" size="small">
          <p>
            Annulation gratuite deux semaines avant la réservation. Si vous
            annulez avant le jour de location, vous aurez droit à un
            rembousrement partiel.
          </p>
        </Card>
        <Card title="Règle de base " size="small">
          <p>
            Nous demandons à tous les surfeurs de se souvenir d’une règle simple
            qui contribuera à rendre leur surf agréable, pour eux comme pour les
            loueurs. Traitez la board comme si c’était la vôtre !
          </p>
        </Card>
      </Space>
      <br />
      <button
        className={styles.button}
        id="pay"
        onClick={() => RedirectionRecapBooking("classic")}
      >
        Confirmer et payer
      </button>
      <br />
    </div>
  );
}

export default Payments;
