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
import SurfsComments from "./surfsComments";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

function Posts() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");

  const router = useRouter();
  const [surfDetails, setSurfDetails] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const booking = useSelector((state) => state.booking.value);

  useEffect(() => {
    if (booking.startDate && booking.endDate) {
      setSelectedDates({
        startDate: booking.startDate,
        endDate: booking.endDate,
      });
    }
  }, []);

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
      router.push({
        pathname: "/booking",
      });
    } else {
      router.push({
        pathname: "/signUp",
      });
    }
  };

  const dateRangeOverlaps = (dateRange1, dateRange2) => {
    console.log(dateRange1, dateRange2);
    dateRange1.startDate = new Date(dateRange1.startDate).getTime();
    dateRange1.endDate = new Date(dateRange1.endDate).getTime();

    dateRange2.startDate = new Date(dateRange2.startDate).getTime();
    dateRange2.endDate = new Date(dateRange2.endDate).getTime();

    if (
      dateRange1.startDate <= dateRange2.startDate &&
      dateRange2.startDate <= dateRange1.endDate
    )
      return true; // dateRange2 starts in dateRange1
    if (
      dateRange1.startDate <= dateRange2.endDate &&
      dateRange2.endDate <= dateRange1.endDate
    )
      return true; // dateRange2 ends in dateRange1
    if (
      dateRange2.startDate < dateRange1.startDate &&
      dateRange1.endDate < dateRange2.endDate
    )
      return true; // dateRange2 includes dateRange1
    return false;
  };

  const checkAvailabibility = (dateRangeArray, dateRange) => {
    for (let dr of dateRangeArray) {
      if (dateRangeOverlaps(dr, dateRange)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (checkAvailabibility(availabilities, selectedDates)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectedDates]);

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
            <div className={styles.availabilities}>
              <p className={styles.dispoText}> Disponibilités :</p>
              {availabilities.map((availability) => (
                <p>
                  du{" "}
                  {new Date(availability.startDate).toISOString().split("T")[0]}{" "}
                  au{" "}
                  {new Date(availability.endDate).toISOString().split("T")[0]}
                </p>
              ))}
            </div>
            <Rate value={surfDetails.rating} />
            <Space direction="vertical" size={12}>
              <RangePicker
                defaultValue={[
                  dayjs(
                    booking.startDate
                      ? booking.startDate
                      : new Date().toISOString().split("T")[0],
                    dateFormat
                  ),
                  dayjs(
                    booking.endDate
                      ? booking.endDate
                      : new Date().toISOString().split("T")[0],
                    dateFormat
                  ),
                ]}
                format="YYYY-MM-DD"
                disabled={[false, false]}
                onChange={handleDateSelection}
              />
            </Space>
            <Button onClick={handleRedirect} disabled={isDisabled}>
              Réserver
            </Button>
            {isDisabled ? <p className={styles.availabilitiesError}>Ce surf n'est pas disponible pour la période sélectionnée</p> : <p></p>}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Posts;
