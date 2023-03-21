import { Marker, Popup } from "react-leaflet";
import { useRouter } from "next/router";

function Markers({ markerData }) {
  const { dayPrice, latitude, longitude, name, placeName, type, _id } =
    markerData;
  const position = latitude && longitude ? [latitude, longitude] : null;
  const router = useRouter();

  const handleRedirectPost = () => {
    fetch("https://board-lease-backend.vercel.app/surfs/owner/name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ surfId: _id }),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push({
          pathname: "/posts",
          query: {
            surfProps: JSON.stringify(markerData),
            ownerName: JSON.stringify(data),
          },
        });
      });
  };

  return (
    position && (
      <Marker position={position}>
        <div onClick={() => handleRedirectPost()}>
          <Popup>
            <strong>{placeName}</strong>
            <br />
            <u>
              <strong>{name}</strong>
            </u>
            <br />
            <u>
              <strong>Type:</strong>
            </u>
            &nbsp; {type}
            <br />
            <u>
              <strong>Prix:</strong>
            </u>
            &nbsp; {dayPrice} € / jour
          </Popup>
        </div>
      </Marker>
    )
  );
}

export default Markers;
