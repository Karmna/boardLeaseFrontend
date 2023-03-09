import { useState, useEffect } from "react";
import styles from "../styles/Bookings.module.css";
import { useSelector } from "react-redux";
import { Card } from "antd";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`https://board-lease-backend.vercel.app/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings(data.data);
      });
  }, []);

  const tenantBookingsRecap = bookings?.map((booking, i) => {
    return (
      <div key={i} className={styles.card}>
        <Card>
          <li> Propriétaire : {booking.owner}</li>
          <li> Type de surf : {booking.surfType}</li>
          <li> Nom du surf : {booking.surfName}</li>
          <li>
            Du {new Date(booking.startDate).toISOString().split("T")[0]} au{" "}
            {new Date(booking.endDate).toISOString().split("T")[0]}
          </li>
        </Card>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}> Mes réservations </h1>
      <div className={styles.cardsContainer}>{tenantBookingsRecap}</div>
    </div>
  );
}

export default Bookings;
