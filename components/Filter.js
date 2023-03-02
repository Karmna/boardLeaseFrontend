import * as React from "react";
import styles from "../styles/Search.module.css";
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

  // Fonction qui gère le changement des filtres sélectionnés par l'utilisateur (type, level, maxPrice) à travers des checkboxes
  const onChange = (e) => {
    const { checked, value } = e.target;

    if (e.target.description === "type") {
      setType(checked ? [...type, value] : type.filter((t) => t !== value));
    } else if (e.target.description === "level") {
      setLevel(checked ? [...level, value] : level.filter((l) => l !== value));
    } else if (e.target.description === "price") {
      setMaxPrice(checked ? value : 100);
    }
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
            <Checkbox onChange={onChange} value="Longboard" description="type">
              Longboard
            </Checkbox>
          ),
        },
        {
          key: "1-2",
          label: (
            <Checkbox onChange={onChange} value="Funboard" description="type">
              Funboard
            </Checkbox>
          ),
        },
        {
          key: "1-3",
          label: (
            <Checkbox onChange={onChange} value="Fish" description="type">
              Fish
            </Checkbox>
          ),
        },
        {
          key: "1-4",
          label: (
            <Checkbox onChange={onChange} value="Shortboard" description="type">
              Shortboard
            </Checkbox>
          ),
        },
        {
          key: "1-5",
          label: (
            <Checkbox
              onChange={onChange}
              value="StandUp Paddle"
              description="type"
            >
              StandUp Paddle
            </Checkbox>
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
            <Checkbox onChange={onChange} value="Débutant" description="level">
              Débutant
            </Checkbox>
          ),
        },
        {
          key: "2-2",
          label: (
            <Checkbox
              onChange={onChange}
              value="Intermédiaire"
              description="level"
            >
              Intermédiaire
            </Checkbox>
          ),
        },
        {
          key: "2-3",
          label: (
            <Checkbox onChange={onChange} value="Confirmé" description="level">
              Confirmé
            </Checkbox>
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
            <Checkbox onChange={onChange} value={15} description="price">
              moins de 15€/jour
            </Checkbox>
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
                  // dispatch(addFilter({ minRating: minRating }));
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
