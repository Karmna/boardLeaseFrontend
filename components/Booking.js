import { useState } from "react";
import styles from "../styles/Booking.module.css";
import { Button, Image, DatePicker, Space, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { storeFulfilledBooking } from "../reducers/booking";
import Link from "next/link";

function Booking() {
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const booking = useSelector((state) => state.booking.value);
  console.log(booking);

  // props ou infos à retirer de l'état redux
  // const dayPrice = 25;
  // const name = "Rip Curls Short";
  // const booking.surfType = "Shortboard";

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

  // const handlePayment = () => {//TODO};

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Votre location</h2>
      <div className={styles.datesBlock}>
        <Divider orientation="left">Vos dates</Divider>

        <div className={styles.dateContainer}>
          <Space direction="vertical">
            <DatePicker
              disabled={true}
              onChange={setSearchStartDate}
              placeholder={
                booking.startDate ? booking.startDate : "Date de début"
              }
            />
          </Space>
          <Space direction="vertical">
            <DatePicker
              disabled={true}
              onChange={setSearchEndDate}
              placeholder={booking.startDate ? booking.endDate : "Date de fin"}
            />
          </Space>
        </div>
      </div>
      {booking.dayPrice && booking.startDate && booking.endDate && (
        <div className="recapPaiment">
          <div className={styles.recapitulatif}>
            <Divider orientation="left">Récapitulatif</Divider>
            <p>
              Board : {booking.name} (type : {booking.surfType}).
            </p>
            <p>
              Réservation pour {recapNumberOfDays}{" "}
              {recapNumberOfDays > 1 ? "jours" : "jour"}.
            </p>
            <p>Prix à la journée : {booking.dayPrice}€</p>
            <p>Prix hors taxes : {booking.dayPrice * recapNumberOfDays}€</p>
            <p>Taxes : {booking.dayPrice * recapNumberOfDays * 0.2}€</p>
            <Divider className={styles.total} orientation="right">
              Total : {booking.dayPrice * recapNumberOfDays * 1.2}€
            </Divider>
          </div>
          <Link href="/payments">
            <button className={styles.button}>Passer au paiment</button>
          </Link>
        </div>
      )}
      {!booking.surfName && (
        <Link href="/">
          <button onClick={handlePayment} className={styles.button}>
            Trouver un surf
          </button>
        </Link>
      )}
    </div>
  );
}

export default Booking;
