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
// import { storePendingBooking } from "../reducers/booking";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

function Posts() {
  // utilisation de useMediaQuery pour détecter les correspondances d'écran
  const matches = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const [surfDetails, setSurfDetails] = useState();
  console.log("surfDetails", surfDetails);
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDates, setSelectedDates] = useState([null, null]);

  console.log("availabilities", availabilities);

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
    setSelectedDates({ startDate: dates[0].$d, endDate: dates[1].$d });
  }
  console.log("dates sélectionnées", selectedDates);

  const handleRedirect = () => {
    if (user.token) {
      // dispatch(storePendingBooking({surfId: surfDetails._id, startDate: selectedDates.startDate, endDate: selectedDates.endDate, priceDay: surfDetails.priceDay, surfName: surfDetails.name, surfType: surfDetails.type, deposit: surfDetails.deposit}))
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
    <div>
      {surfDetails ? (
        <>
          <Image src={surfDetails.pictures} alt={surfDetails.name} />
          <div className={styles.title}>
            <h1>{surfDetails.name}</h1>
            <FavoritesManagement surf_Id={surfDetails._id} />
          </div>
          <p>{surfDetails.placeName}</p>
          <p>{surfDetails.type}</p>
          <p>{surfDetails.rating}</p>
          <Space direction="vertical" size={12}>
            <RangePicker
              defaultValue={[
                dayjs("2023-08-01", dateFormat),
                dayjs("2023-08-10", dateFormat),
              ]}
              format="YYYY-MM-DD"
              disabledDate={(current) =>
                current &&
                (current < dayjs("2023-08-01") || current > dayjs("2023-08-10"))
              }
              disabled={[false, false]}
              onChange={handleDateSelection}
            />
          </Space>
          <Button onClick={handleRedirect}> Réserver </Button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Posts;
