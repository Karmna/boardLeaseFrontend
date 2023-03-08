import styles from "../styles/Posts.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { Button, Image, Popover } from "antd";
import { useRouter } from "next/router";
import FavoritesManagement from "./FavoritesManagement";
import { DatePicker, Space } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Rate } from "antd";
import { storePendingBooking } from "../reducers/booking";
import SurfsComments from "./surfsComments";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

function Posts() {
  const matches = useMediaQuery("(min-width:768px)");
  const router = useRouter();
  const [surfDetails, setSurfDetails] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [ownerName, setOwnerName] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const booking = useSelector((state) => state.booking.value);

  useEffect(() => {
    if (router.query.surfProps) {
      const propsJSON = JSON.parse(router.query.surfProps);
      const dataJSON = JSON.parse(router.query.ownerName);
      setSurfDetails(propsJSON);
      setAvailabilities(propsJSON.availabilities);
      setOwnerName(dataJSON.data);
    }
  }, [router.query.surfProps]);

  useEffect(() => {
    if (booking.startDate && booking.endDate) {
      setSelectedDates({
        startDate: booking.startDate,
        endDate: booking.endDate,
      });
    }
  }, []);

  function handleDateSelection(dates) {
    setSelectedDates({
      startDate: dates[0].$d,
      endDate: dates[1].$d,
    });
  }

  const handleRedirect = () => {
    dispatch(
      storePendingBooking({
        surfId: surfDetails._id,
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
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

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
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
              &nbsp; {ownerName}
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
              {availabilities.map((availability, i) => (
                <p key={i}>
                  du{" "}
                  {new Date(availability.startDate).toISOString().split("T")[0]}{" "}
                  au{" "}
                  {new Date(availability.endDate).toISOString().split("T")[0]}
                </p>
              ))}
            </div>

            <Popover
              style={{
                height: "auto",
                width: "auto",
                border: "none",
                borderRadius: "0px",
                cursor: "pointer",
                fontSize: "17px",
                margin: "0px",
                padding: "0px"
              }}
              content={<SurfsComments />}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}             
            >
              <div className={styles.comments}>
                <p>
                  <u>Notes et avis récents</u>
                </p>
              </div>
            </Popover>

            <Space direction="vertical" size={12}>
              <RangePicker              
                defaultValue={[
                  dayjs(
                    booking.startDate
                      ? booking.startDate
                      : new Date(availabilities[0].startDate)
                          .toISOString()
                          .split("T")[0],
                    dateFormat
                  ),
                  dayjs(
                    booking.endDate
                      ? booking.endDate
                      : new Date(availabilities[0].endDate)
                          .toISOString()
                          .split("T")[0],
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
            {isDisabled ? (
              <p className={styles.availabilitiesError}>
                Ce surf n'est pas disponible pour la période sélectionnée
              </p>
            ) : (
              <p></p>
            )}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Posts;
