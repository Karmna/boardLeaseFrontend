import styles from "../styles/Recap.module.css";
import { useState } from "react";

import { Card, Image, DatePicker, Space, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { storeFulfilledBooking } from "../reducers/booking";

function Recap() {
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const booking = useSelector((state) => state.booking.value);
  console.log(booking);

  const calculateNumberOfDays = () => {
    if (!booking.startDate || !booking.endDate) return;
    const DAY_IN_MS = 1000 * 60 * 60 * 24;

    return Math.floor(
      (new Date(booking.endDate).getTime() -
        new Date(booking.startDate).getTime()) /
        DAY_IN_MS
    );
  };
  const recapNumberOfDays = calculateNumberOfDays();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Votre location est validée</h2>
      <div className={styles.datesBlock}>
        <Divider orientation="left">Vos dates de réservation</Divider>

        <div className={styles.dateContainer}>
          <Space direction="vertical">
            <DatePicker
              disabled={true}
              onChange={setSearchStartDate}
              placeholder={
                booking.startDate
                  ? new Date(booking.startDate).toISOString().split("T")[0]
                  : "Date de début"
              }
            />
          </Space>
          <Space direction="vertical">
            <DatePicker
              disabled={true}
              onChange={setSearchEndDate}
              placeholder={
                booking.startDate
                  ? new Date(booking.endDate).toISOString().split("T")[0]
                  : "Date de fin"
              }
            />
          </Space>
        </div>
      </div>
      {booking.dayPrice && booking.startDate && booking.endDate && (
        <div className={styles.recap}>
          <div className={styles.recapitulatif}>
            <Card title="Récapitulatif du paiement" bordered={false}>
              <p>Board : {booking.surfName}</p>
              <p>Type : {booking.surfType}</p>
              <p>
                Réservation pour {recapNumberOfDays}{" "}
                {recapNumberOfDays > 1 ? "jours" : "jour"}.
              </p>
              <p>Prix à la journée : {booking.dayPrice}€</p>
              <p> Caution : {booking.deposit}€ </p>
              <p>Prix hors taxes : {booking.dayPrice * recapNumberOfDays}€</p>
              <p>
                Taxes : {Math.floor(booking.dayPrice * recapNumberOfDays * 0.2)}
                €
              </p>
              <Divider className={styles.total} orientation="right">
                Total :
                {booking.deposit +
                  Math.floor(booking.dayPrice * recapNumberOfDays * 1.2)}
                €
              </Divider>
            </Card>
          </div>

          <div className={styles.gifContainer}>
            <p>Merci pour votre réservation.</p>
            <p> Ambre, Xavier, Sebastien et Antony de l'équipe Board Lease !</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recap;
