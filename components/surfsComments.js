import styles from "../styles/SurfsComments.module.css";
import * as ratings from "../data/ratingData"
import { useSelector } from "react-redux";

function SurfsComments() {  
    
function getIndex() {
    index = Math.floor(Math.random() * 19);
    return index
}

const i = getIndex();
console.log(i);

  return (
    <div>
<p>{`ratings.surfRating${i}.name`}</p>
<p>{`ratings.surfRating${i}.text`}</p>
<p>{`ratings.surfRating${i}.rating`}</p>
    </div>
  );
}

export default SurfsComments;