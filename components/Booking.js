import { useState } from "react";
import styles from "../styles/Booking.module.css";
import { Button, Image, DatePicker, Space, Divider } from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";

function Booking() {
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();

  const user = useSelector((state) => state.user.value);
  const filter = useSelector((state) => state.filter.value);
  console.log(user);

  // props ou infos à retirer de l'état redux
  const dayPrice = 25;
  const name = "Rip Curls Short";
  const type = "Shortboard";

  const calculateNumberOfDays = () => {
    if (!filter.availabilities || !filter.availabilities) return 10;
    const DAY_IN_MS = 1000 * 60 * 60 * 24;

    return Math.floor(
      (new Date(filter.availabilities.endDate).getTime() -
        new Date(filter.availabilities.startDate).getTime()) /
        DAY_IN_MS
    );
  };
  const recapNumberOfDays = calculateNumberOfDays();

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
                filter.availabilities
                  ? filter.availabilities.startDate
                  : "Date de début"
              }
            />
          </Space>
          <Space direction="vertical">
            <DatePicker
              disabled={true}
              onChange={setSearchEndDate}
              placeholder={
                filter.availabilities
                  ? filter.availabilities.endDate
                  : "Date de fin"
              }
            />
          </Space>
        </div>
      </div>
      {filter.availabilities && filter.availabilities && (
        <div className="recapPaiment">
          <div className={styles.recapitulatif}>
            <Divider orientation="left">Récapitulatif</Divider>
            <p>
              Board : {name} (type : {type}).
            </p>
            <p>
              Réservation pour {recapNumberOfDays}{" "}
              {recapNumberOfDays > 1 ? "jours" : "jour"}.
            </p>
            <p>Prix à la journée : {dayPrice}€</p>
            <p>Prix hors taxes : {dayPrice * recapNumberOfDays}€</p>
            <p>Taxes : {dayPrice * recapNumberOfDays * 0.2}€</p>
            <Divider className={styles.total} orientation="right">
              Total : {dayPrice * recapNumberOfDays * 1.2}€
            </Divider>
          </div>
          <Link href="/payments">
            <button className={styles.button}>Passer au paiment</button>
          </Link>
        </div>
      )}
      {!filter.availabilities && !filter.availabilities && (
        <Link href="/">
          <button className={styles.button}>Trouver un surf</button>
        </Link>
      )}
    </div>
  );
}

export default Booking;
