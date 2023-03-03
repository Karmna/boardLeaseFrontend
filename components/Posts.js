import styles from "../styles/Posts.module.css";
import { selectedSurf } from "../reducers/post";
import {  useSelector } from "react-redux";

function Posts() {

const post = useSelector((state) => state.post.value);

  if (!selectedSurf) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={post.pictures} alt={post.name} />
      <h1>{post.name}</h1>
      <p>{post.placeName}</p>
      <p>{post.type}</p>
      <p>{post.rating}</p>
    </div>
  );
}

export default Posts;
