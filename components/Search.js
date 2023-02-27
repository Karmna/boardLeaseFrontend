import * as React from "react";
import styles from "../styles/Search.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Checkbox, Rate } from "antd";
import Surf from "./Surf";

function Search() {
  const matches = useMediaQuery("(min-width:768px)");
  const [value, setValue] = useState(3);
  const [open, setOpen] = useState(false);
  // const [surfsData, setSurfsData] = useState([]);

  console.log("rating", value);

  const surfsData = [
    {
      owner: "Kevin",
      type: "Shortboard",
      level: "Confirmé",
      name: "Torc ShortBoard",
      dayPrice: 20,
      pictures: "/th.webp",
      place: "Biarritz",
      availabilities: "du 10/08/2023 au 30/08/2023",
      rating: 4,
      deposit: 300,
    },
  ];

  //   useEffect(() => {
  //     fetch('http://localhost:3000/surfs/surfs')
  //       .then(response => response.json())
  //       .then(data => {
  //         setSurfsData(data);
  //       });
  //   }, []);

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const items = [
    {
      key: "1",
      type: "group",
      label: "Types de boards",
      children: [
        {
          key: "1-1",
          label: <Checkbox onChange={onChange}>Longboards</Checkbox>,
        },
        {
          key: "1-2",
          label: <Checkbox onChange={onChange}>Funboards</Checkbox>,
        },
        {
          key: "1-3",
          label: <Checkbox onChange={onChange}>Fishs</Checkbox>,
        },
        {
          key: "1-4",
          label: <Checkbox onChange={onChange}>Shortboards</Checkbox>,
        },
        {
          key: "1-5",
          label: <Checkbox onChange={onChange}>StandUp Paddle</Checkbox>,
        },
      ],
    },
    {
      key: "2",
      type: "group",
      label: "Niveau",
      children: [
        {
          key: "2-1",
          label: <Checkbox onChange={onChange}>Débutant</Checkbox>,
        },
        {
          key: "2-2",
          label: <Checkbox onChange={onChange}>Intermédiaire</Checkbox>,
        },
        {
          key: "2-3",
          label: <Checkbox onChange={onChange}>Confirmé</Checkbox>,
        },
      ],
    },
    {
      key: "3",
      type: "group",
      label: "Prix",
      children: [
        {
          key: "3-1",
          label: <Checkbox onChange={onChange}>moins de 15€/jour</Checkbox>,
        },
        {
          key: "3-2",
          label: <Checkbox onChange={onChange}>à partir de 15€/jour</Checkbox>,
        },
      ],
    },
    {
      key: "4",
      type: "group",
      label: "Avis",
      children: [
        {
          key: "4-1",
          label: (
            <span className={styles.rate}>
              <Rate onChange={setValue} value={value} />
            </span>
          ),
        },
      ],
    },
  ];

  const surfs = surfsData.map((data, i) => {
    return <Surf key={i} {...data} />;
  });

  return (
    <div className={styles.content}>
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        onOpenChange={handleOpenChange}
        open={open}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Plus de filtres
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <div className={styles.cardsContainer}>{surfs}</div>
    </div>
  );
}

export default Search;
