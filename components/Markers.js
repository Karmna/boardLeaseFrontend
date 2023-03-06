import { Marker, Popup } from "react-leaflet";

function Markers({ markerData }) {
  const { latitude, longitude, type, dayPrice } = markerData;
  const position = latitude && longitude ? [latitude, longitude] : null;
 
  return (
    position && (
      <Marker position={position} >
        <Popup>
          <u>
            <strong>{type}</strong>
          </u>
          <br />
          <u>
            <strong>Prix:</strong>
          </u>
          &nbsp; {dayPrice} € / jour
        </Popup>
      </Marker>
    )
  );
}

export default Markers;
