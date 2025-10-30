import { useEffect, useState } from "react";

import "./Rifugio.css";
import { useParams } from "react-router-dom";
import type { RifugioType } from "../../types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Rifugio() {
  // const [count, setCount] = useState(0)

  const { id } = useParams(); // this gets the id from the route

  const [rifugio, setrifugio] = useState<RifugioType | null>(null);

  useEffect(() => {
    // Make API call using the id
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:8080/rifugios/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setrifugio(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, [id]); // re-run if id changes

  if (!rifugio) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center flex-col w-full">
        <h1>{rifugio.name}</h1>
        <img className="w-24 h-24" src={rifugio.image} alt="" />
        <MapContainer
          className="h-[200px] w-[500px] "
          center={[rifugio.location.coordinates.lat, rifugio.location.coordinates.lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[rifugio.location.coordinates.lat, rifugio.location.coordinates.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}

export default Rifugio;
