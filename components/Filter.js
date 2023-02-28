import * as React from "react";
import styles from "../styles/Search.module.css";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Checkbox, Rate } from "antd";
import { addFilter } from "../reducers/filter";
import { useDispatch } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState([]);
  const [level, setLevel] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(3);

  console.log(
    "type",
    type,
    "level",
    level,
    "maxPrice",
    maxPrice,
    "rating",
    minRating
  );

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const onChange = (e) => {
    const { checked, value } = e.target;
    if (e.target.description === "type") {
      setType(checked ? [...type, value] : type.filter((t) => t !== value));
      dispatch(addFilter(type));
    } else if (e.target.description === "level") {
      setLevel(checked ? [...level, value] : level.filter((l) => l !== value));
      dispatch(addFilter(level));
    } else if (e.target.description === "price") {
      setMaxPrice(checked ? value : 100);
      dispatch(addFilter(maxPrice));
    }
  };

  const items = [
    {
      key: "1",
      type: "group",
      label: "Types de boards",
      children: [
        {
          key: "1-1",
          label: (
            <Checkbox onChange={onChange} value="longboard" description="type">
              Longboard
            </Checkbox>
          ),
        },
        {
          key: "1-2",
          label: (
            <Checkbox onChange={onChange} value="funboard" description="type">
              Funboard
            </Checkbox>
          ),
        },
        {
          key: "1-3",
          label: (
            <Checkbox onChange={onChange} value="fish" description="type">
              Fish
            </Checkbox>
          ),
        },
        {
          key: "1-4",
          label: (
            <Checkbox onChange={onChange} value="shortboard" description="type">
              Shortboard
            </Checkbox>
          ),
        },
        {
          key: "1-5",
          label: (
            <Checkbox
              onChange={onChange}
              value="standup_paddle"
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
            <Checkbox onChange={onChange} value="débutant" description="level">
              Débutant
            </Checkbox>
          ),
        },
        {
          key: "2-2",
          label: (
            <Checkbox
              onChange={onChange}
              value="intermédiaire"
              description="level"
            >
              Intermédiaire
            </Checkbox>
          ),
        },
        {
          key: "2-3",
          label: (
            <Checkbox onChange={onChange} value="confirmé" description="level">
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
                  dispatch(addFilter({ minRating: minRating }));
                }}
                value={minRating}
              />
            </span>
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
