import * as React from "react";
import styles from "../styles/Filter.module.css";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Checkbox, Rate } from "antd";
import { addFilter } from "../reducers/filter";
import { useDispatch, useSelector } from "react-redux";

function Filter() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState([]);
  const [level, setLevel] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const filter = useSelector((state) => state.filter.value);

  const dispatch = useDispatch();

  // Dispatch de addFilter avec les filtres sélectionnés par l'utilisateur au click sur le bouton filtrer
  const handleFilter = () => {
    dispatch(
      addFilter({
        type,
        level,
        maxPrice,
        minRating,
        placeName: filter.placeName,
        availabilities: filter.availabilities,
      })
    );
  };

  // Fonction qui gère la fermeture du menu lorsque l'utilisateur clique sur un item
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };

  // Fonction qui gère l'état du menu (ouvert ou fermé)
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const typeOptions = [    
    {
      label: "Longboard",
      value: "Longboard",
    },
    {
      label: "Funboard",
      value: "Funboard",
    },
    {
      label: "Fish",
      value: "Fish",
    },
    {
      label: "Shortboard",
      value: "Shortboard",
    },
    {
      label: "StandUp Paddle",      
      value: "StandUp Paddle",      
    },
  ];

  const levelOptions = [
  {
    label: "Débutant",
    value: "Débutant",
  },
  {
    label: "Intermédiaire",
    value: "Intermédiaire",
  },
  {
    label: "Confirmé",      
    value: "Confirmé",      
  },
];

  const onChangeType = (value) => {
    setType(value);
  };

  const onChangeLevel = (value) => {
    setLevel(value);
  };

  const onChangeMaxPrice = () => {
    setMaxPrice(15);
  };

  // Items présents dans le dropdown, les checkboxes(type, level, maxPrice), le rating et bouton filtrer.
  const items = [
    {
      key: "1",
      type: "group",
      label: "Types de boards",
      children: [
        {
          key: "1-1",
          label: (          
            <Checkbox.Group
              options={typeOptions}
              value={type}
              onChange={onChangeType}
              className={styles.checkBox}
            />           
          ),
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
          label: (
            <Checkbox.Group
              options={levelOptions}
              value={level}
              onChange={onChangeLevel}
              className={styles.checkBox}
            />
          ),
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
          label: (
            <Checkbox onChange={onChangeMaxPrice}>moins de 15€/jour</Checkbox>
          ),
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
              <Rate
                onChange={(minRating) => {
                  setMinRating(minRating);
                }}
                value={minRating}
              />
            </span>
          ),
        },
      ],
    },
    {
      key: "5",
      type: "group",
      label: "",
      children: [
        {
          key: "5-1",
          label: (
            <button className={styles.button} onClick={() => handleFilter()}>
              Filtrer
            </button>
          ),
        },
      ],
    },
  ];

  return (
    <div className={styles.filter}>
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
    </div>
  );
}

export default Filter;
