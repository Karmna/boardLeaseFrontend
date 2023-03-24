import styles from "../styles/Booking.module.css";
import { DatePicker, Space, Divider } from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";
import { calculateNumberOfDays } from "../lib/leaseLibraryFront";
import { useRouter } from "next/router";

function Booking() {
  const booking = useSelector((state) => state.booking.value);
  console.log(booking);
  const router = useRouter();

  const recapNumberOfDays = calculateNumberOfDays(
    booking.startDate,
    booking.endDate
  );
  console.log(recapNumberOfDays);

  const total = booking.deposit + booking.dayPrice * recapNumberOfDays * 1.2;
  const handlePayment = () => {
    router.push({
      pathname: "/payments",
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Votre location</h2>
      <div className={styles.datesBlock}>
        <Divider orientation="left">Vos dates</Divider>

        <div className={styles.dateContainer}>
          <Space direction="vertical">
            <DatePicker
              disabled={true}
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
        <div className={styles.recapPaiment}>
          <div className={styles.recapitulatif}>
            <Divider orientation="left">Récapitulatif</Divider>
            <p>Board : {booking.surfName}</p>
            <p>Type : {booking.surfType}</p>
            <p>
              Réservation pour {recapNumberOfDays}{" "}
              {recapNumberOfDays > 1 ? "jours" : "jour"}
            </p>
            <p>Prix à la journée : {booking.dayPrice}€</p>
            <p>Prix hors taxes : {booking.dayPrice * recapNumberOfDays}€</p>
            <p>
              Taxes :{" "}
              {Math.floor(booking.dayPrice * recapNumberOfDays * 0.2).toFixed(
                2
              )}
              €
            </p>
            <p>Caution : {booking.deposit}€</p>
            <Divider className={styles.total} orientation="right">
              Total : {total.toFixed(2)}€
            </Divider>
          </div>
          <div className={styles.btnContainer}>
            <Link href="/payments">
              <button className={styles.button}>Passer au paiement</button>
            </Link>
          </div>
        </div>
      )}
      {!booking.surfName && (
        <div className={styles.btnContainer}>
          <Link href="/">
            <button onClick={handlePayment} className={styles.button}>
              Trouver un surf
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Booking;
