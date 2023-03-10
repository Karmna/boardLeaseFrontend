import styles from "../styles/Posts.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { Image, Popover } from "antd";
import { useRouter } from "next/router";
import FavoritesManagement from "./FavoritesManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, Space, Card } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { storePendingBooking } from "../reducers/booking";
import SurfsComments from "./surfsComments";
import { checkAvailabibility } from "../lib/leaseLibraryFront";
dayjs.extend(customParseFormat);

function Posts() {
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

  console.log("selectedDates", selectedDates);
  console.log("surfDetails", surfDetails);

  let toggleDisplay = true;
  useEffect(() => {
    if (router.query.surfProps) {
      const propsJSON = JSON.parse(router.query.surfProps);
      const dataJSON = JSON.parse(router.query.ownerName);
      if (router.query.surfProps) {
        setSurfDetails(propsJSON);
        setAvailabilities(propsJSON.availabilities);
        setOwnerName(dataJSON.data);
      }

      if (booking.startDate && booking.endDate) {
        setSelectedDates({
          startDate: booking.startDate,
          endDate: booking.endDate,
        });
      } else {
        console.log(availabilities);

        setSelectedDates(propsJSON.availabilities[0]);
      }
    } else {
      toggleDisplay = false;
    }
  }, [router.query.surfProps]);

  useEffect(() => {
    if (checkAvailabibility(availabilities, selectedDates)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectedDates]);

  const handleStartDate = (date, dateString) => {
    setSelectedDates((endDate) => ({
      ...endDate,
      startDate: dateString,
    }));
  };

  const handleEndDate = (date, dateString) => {
    setSelectedDates((startDate) => ({
      ...startDate,
      endDate: dateString,
    }));
  };

  const handleRedirect = () => {
    dispatch(
      storePendingBooking({
        surfId: surfDetails._id,
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate,
        dayPrice: surfDetails.dayPrice,
        placeName: surfDetails.placeName,
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
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleRedirectSearch = () => {
    router.push({
      pathname: "/search",
    });
  };

  return (
    <div className={styles.container}>
      {surfDetails && toggleDisplay ? (
        <>
          <div>
            <FontAwesomeIcon
              className={styles.chevronIcon}
              icon={faChevronLeft}
              style={{ color: "#060c5c" }}
              onClick={handleRedirectSearch}
              size="lg"
            />
          </div>
          <div className={styles.title}>
            <h1 className={styles.name}>{surfDetails.name}</h1>
            <FavoritesManagement surf_Id={surfDetails._id} />
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
              padding: "0px",
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
          <Image src={surfDetails.pictures} alt={surfDetails.name} />;
          <div className={styles.content}>
            <p className={styles.owner}>
              Surf de {ownerName} de {surfDetails.placeName}
            </p>
            <div className={styles.buttonContainer}>
              <Space direction="vertical">
                <DatePicker
                  onChange={handleStartDate}
                  placeholder={
                    booking.startDate
                      ? booking.startDate
                      : new Date(availabilities[0].startDate)
                          .toISOString()
                          .split("T")[0]
                  }
                />
              </Space>
              <Space direction="vertical">
                <DatePicker
                  onChange={handleEndDate}
                  placeholder={
                    booking.endDate
                      ? booking.endDate
                      : new Date(availabilities[0].endDate)
                          .toISOString()
                          .split("T")[0]
                  }
                />
              </Space>
              <button
                className={styles.button}
                onClick={handleRedirect}
                disabled={isDisabled}
              >
                Réserver
              </button>
            </div>
            <Card bordered={false}>
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
                <p className={styles.dispoText}> Disponibilités du surf:</p>
                {availabilities.map((availability, i) => (
                  <p key={i}>
                    du{" "}
                    {
                      new Date(availability.startDate)
                        .toISOString()
                        .split("T")[0]
                    }{" "}
                    au{" "}
                    {new Date(availability.endDate).toISOString().split("T")[0]}
                  </p>
                ))}
              </div>
            </Card>
          </div>
          <br />
          {isDisabled ? (
            <p className={styles.availabilitiesError}>
              Ce surf n'est pas disponible pour la période sélectionnée
            </p>
          ) : (
            <p></p>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Posts;
