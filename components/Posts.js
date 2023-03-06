import styles from "../styles/Posts.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { Button, Image } from "antd";
import { useRouter } from "next/router";
import FavoritesManagement from "./FavoritesManagement";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Rate } from "antd";
import { storePendingBooking } from "../reducers/booking";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

function Posts() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");

  const router = useRouter();
  const [surfDetails, setSurfDetails] = useState(null);
  console.log("surfDetails", surfDetails);
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const booking = useSelector((state) => state.booking.value);

  console.log("availabilities", availabilities);

  useEffect(() => {
    if (booking.startDate && booking.endDate) {
      setSelectedDates({
        startDate: booking.startDate,
        endDate: booking.endDate,
      });
    }
  });

  useEffect(() => {
    if (router.query.surfProps) {
      const propsJSON = JSON.parse(router.query.surfProps);
      setSurfDetails(propsJSON);
      setAvailabilities(propsJSON.availabilities);
    }
  }, [router.query.surfProps]);

  function handleDateSelection(dates) {
    const selectedDates = dates.map((date) => date.$d);
    console.log(selectedDates);
    setSelectedDates({
      startDate: dates[0].$d,
      endDate: dates[1].$d,
    });
  }
  console.log("dates sélectionnées", selectedDates);

  const handleRedirect = () => {
    console.log({ surfDetails: surfDetails.name });
    console.log({ booking });
    dispatch(
      storePendingBooking({
        surfId: surfDetails._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        dayPrice: surfDetails.dayPrice,
        surfName: surfDetails.name,
        surfType: surfDetails.type,
        deposit: surfDetails.deposit,
      })
    );
    if (user.token) {
      dispatch(
        storePendingBooking({
          surfId: surfDetails._id,
          startDate: selectedDates.startDate,
          endDate: selectedDates.endDate,
          priceDay: surfDetails.priceDay,
          surfName: surfDetails.name,
          surfType: surfDetails.type,
          deposit: surfDetails.deposit,
        })
      );
      router.push({
        pathname: "/booking",
      });
    } else {
      router.push({
        pathname: "/signUp",
      });
    }
  };

  return (
    <div className={styles.container}>
      {surfDetails ? (
        <>
          <Image src={surfDetails.pictures} alt={surfDetails.name} />
          <div className={styles.content}>
            <div className={styles.title}>
              <h1 className={styles.name}>{surfDetails.name}</h1>
              <FavoritesManagement surf_Id={surfDetails._id} />
            </div>

            <p className={styles.owner}>
              <u>
                <strong>Loué par:</strong>
              </u>
              &nbsp; {surfDetails.owner}
            </p>
            <p className={styles.placeName}>
              <u>
                <strong>De:</strong>
              </u>
              &nbsp; {surfDetails.placeName}
            </p>

            <p className={styles.type}>
              <u>
                <strong>Type:</strong>
              </u>
              &nbsp; {surfDetails.type}
            </p>

            <p className={styles.level}>
              <u>
                <strong>Niveau:</strong>
              </u>
              &nbsp; {surfDetails.level}
            </p>
            <p className={styles.dayPrice}>
              <u>
                <strong>Prix:</strong>
              </u>
              &nbsp; {surfDetails.dayPrice} € / jour
            </p>

            <Rate value={surfDetails.rating} />
            <Space direction="vertical" size={12}>
              <RangePicker
                defaultValue={[
                  dayjs(booking.startDate, dateFormat),
                  dayjs(booking.endDate, dateFormat),
                ]}
                format="YYYY-MM-DD"
                disabledDate={(current) =>
                  current &&
                  (current < dayjs(booking.startDate) ||
                    current > dayjs(booking.endDate))
                }
                disabled={[false, false]}
                onChange={handleDateSelection}
              />
            </Space>
            <Button
              disabled={!booking.startDate || !booking.endDate}
              onClick={handleRedirect}
            >
              Réserver
            </Button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Posts;
