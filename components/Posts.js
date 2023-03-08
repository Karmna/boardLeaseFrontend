import styles from "../styles/Posts.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { Image, List, Popover } from "antd";
import { useRouter } from "next/router";
import FavoritesManagement from "./FavoritesManagement";
import { DatePicker, Space, Card } from "antd";
import "antd/dist/reset.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { storePendingBooking } from "../reducers/booking";
import SurfsComments from "./surfsComments";
<<<<<<< HEAD
import { faDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
import { checkAvailabibility } from "../lib/leaseLibraryFront";
>>>>>>> bd1704f195f542535ff32d49355fee37745b76b1

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

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

  useEffect(() => {
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
  }, [router.query.surfProps]);

  useEffect(() => {
    if (checkAvailabibility(availabilities, selectedDates)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectedDates]);

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

  return (
    <div className={styles.container}>
      {surfDetails ? (
        <>
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
          <Image src={surfDetails.pictures} alt={surfDetails.name} />
          <div className={styles.content}>
            <p className={styles.owner}>
              Surf de {ownerName} de {surfDetails.placeName}
            </p>
<<<<<<< HEAD
            <Card bordered={false} >
              <p className={styles.type}>
                <u>
                  <strong>Type:</strong>
                </u>
                &nbsp; {surfDetails.type}
=======
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
            </Card>
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
                popupStyle={{ width: '50%' }}                
              />
            </Space>
            <Button onClick={handleRedirect} disabled={isDisabled}>
              Réserver
            </Button>
            {isDisabled ? (
              <p className={styles.availabilitiesError}>
                Ce surf n'est pas disponible pour la période sélectionnée
>>>>>>> bd1704f195f542535ff32d49355fee37745b76b1
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

              <Space direction="vertical" size={12}>
                <strong className={styles.dispoText}>
                  Sélectionner des dates:
                </strong>
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
            </Card>
          </div>
          <br/>
          <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={handleRedirect}
            disabled={isDisabled}
          >
            Réserver
          </button>
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
