import styles from "../styles/Recap.module.css";
import { useState } from "react";

import { Card , Image, DatePicker, Space, Divider } from "antd";
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
            <Card title="Récapitulatif du paiement" bordered={false} style={{ width: 300 }}>
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
            </Card>
          </div>
          <br/>
          <br/>
          <p> Merci pour votre réservation. Une copie vient d’être envoyée à votre adresse email !</p>
          <br/>
          <Image
          width={150}
          src="/surfing-olympics.gif"
          layout="fill"
          objectFit="contain"
          alt="Slide image 1"
          priority={true}
        />
          
        </div>
      )}
      
    </div>
  );
}

export default Recap;
