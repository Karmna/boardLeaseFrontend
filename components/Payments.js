import styles from "../styles/Payments.module.css";
import { Input, Divider, Space, Card } from "antd";
import { useState } from "react";
import Cards from "react-credit-cards";
import Stripe from "stripe";
import "react-credit-cards/es/styles-compiled.css";
import CheckoutForm from "./CheckoutForm";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Mizz2HUwd3Z4pQXsmbWkQEJ8ptsohp3LyNy7OhFnxoLreinfbuuz8gqPKyMzZXGtKPwGeTRa7qhXPpqw2NUTsKl00DU5olg8X"
);

function Payments() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [crypto, setCrypto] = useState("");
  const [focus, setFocus] = useState("");

  const regexCardNumber =
    "(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35d{3})d{11}$)";

  const handleInputFocus = async (e) => {
    setFocus: e.target.name;
  };

  const isCreditCardNumberValid = () => {
    if (cardNumber.match(regexCardNumber)) {
      return true;
    }
    return false;
  };

  const handleExpiredDateInput = (e) => {
    if (isNaN(e.target.value)) {
      return;
    }

    setExpiredDate(e.target.value);
  };

  const handleCryptoInput = (e) => {
    if (isNaN(e.target.value)) {
      return;
    }

    setCrypto(e.target.value);
  };

  const isCreditCardValid = () => {
    return isCreditCardNumberValid() && cardName && expiredDate && crypto;
  };

  const handlePay = async (event) => {
    event.preventDefault();

    //     fetch("https://board-lease-backend.vercel.app/surfs/filter", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    // totalPrice:
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data);
    //         dispatch(addSurfs(data.data));
    //       });

    setTimeout(() => {
      console.log("test");
    }, 2000);
  };

  return (
    <div className={styles.paymentsContainer}>
      <h1> Paiement </h1>
      <br />
      <Space
        direction="vertical"
        size="middle"
        style={{ display: "flex" }}
      ></Space>

      <div id="PaymentForm">
        <div className={styles.card}>
          <Cards
            cvc={crypto}
            expiry={expiredDate}
            focused={focus}
            name={cardName}
            number={cardNumber}
          />
        </div>
        <form>
          <Input
            type="Numéro de carte"
            placeholder="Numéro de carte"
            id="cardsNumber"
            onChange={(e) => setCardNumber(e.target.value)}
            value={cardNumber}
            style={{ color: isCreditCardNumberValid() ? "black" : "red" }}
            maxLength="16"
            onFocus={(e) => setFocus(e.target.name)}
            className={styles.input}
          />
          <Input
            type="Nom"
            placeholder="Nom"
            id="name"
            onChange={(e) => setCardName(e.target.value)}
            value={cardName}
            onFocus={(e) => setFocus(e.target.name)}
            className={styles.input}
          />
          <Input
            type="Date d'expiration"
            placeholder="Date d'expiration"
            id="expiredDate"
            onChange={(e) => handleExpiredDateInput(e)}
            value={expiredDate}
            maxLength="4"
            onFocus={(e) => setFocus(e.target.name)}
            className={styles.input}
          />
          <Input
            type="tel"
            name="cvc"
            placeholder="Crypto"
            id="Crypto"
            onChange={(e) => setCrypto(e.target.value)}
            value={crypto}
            maxLength="3"
            onFocus={(e) => setFocus(e.target.name)}
            className={styles.input}
          />
        </form>
      </div>

      {/* <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements> */}

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
      <button className={styles.button} id="pay" onClick={handlePay}>
        Confirmer et payer
      </button>
      <br />
    </div>
  );
}

export default Payments;
