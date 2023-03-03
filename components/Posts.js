import styles from "../styles/Posts.module.css";
import { selectedSurf } from "../reducers/post";
import {  useSelector } from "react-redux";
import * as React from "react";
import { Button, Image } from "antd";

function Posts() {

const post = useSelector((state) => state.post.value);

  if (!selectedSurf) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Image src={post.pictures} alt={post.name}  />
      <h1>{post.name}</h1>
      <p>{post.placeName}</p>
      <p>{post.type}</p>
      <p>{post.rating}</p>
      <Button> Réserver </Button>
    </div>
  );
}

export default Posts;
