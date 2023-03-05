import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as React from "react";

import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { updateFavorites } from "../reducers/favorites";

function FavoritesManagement(surf_Id) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const favorites = useSelector((state) => state.favorites.value);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const [surf, setSurf] = useState();
  console.log(surf);

  useEffect(() => {
    if (router.query.surfProps) {
      const propsJSON = JSON.parse(router.query.surfProps);
      setSurf(propsJSON);
    }
  }, [router.query.surfProps]);

  useEffect(() => {
    if (surf && favorites.find((favorite) => favorite._id === surf._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites]);

  const handleFavorite = () => {
    fetch(
      `https://board-lease-backend.vercel.app/surfs/addFavorite/${surf._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(updateFavorites(data.data));
        }
      });
  };

  let iconStyle = { color: "#eeeee4" };
  if (isFavorite) {
    iconStyle = { color: "#060c5c" };
  }

  return (
    <FontAwesomeIcon
      icon={faStar}
      style={iconStyle}
      onClick={() => handleFavorite()}
    />
  );
}

export default FavoritesManagement;
