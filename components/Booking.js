import { useState } from "react";
import styles from "../styles/Booking.module.css";
import { Button, Image, DatePicker, Space } from "antd";
import { useSelector } from "react-redux";

function Booking() {
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();

  const user = useSelector((state) => state.user.value);
  const filter = useSelector((state) => state.filter.value);
  console.log(user);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Votre location</h2>
      <div className={styles.dateContainer}>
        <Space direction="vertical">
          <DatePicker
            onChange={setSearchStartDate}
            placeholder={
              filter.availabilities.startDate
                ? filter.availabilities.startDate
                : "Date de début"
            }
          />
        </Space>
        <Space direction="vertical">
          <DatePicker
            onChange={setSearchEndDate}
            placeholder={
              filter.availabilities.endDate
                ? filter.availabilities.endDate
                : "Date de fin"
            }
          />
        </Space>
      </div>
    </div>
  );
}

export default Booking;
