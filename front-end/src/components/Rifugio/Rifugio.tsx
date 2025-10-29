import { useEffect, useState } from "react";

import "./Rifugio.css";
import { useParams } from "react-router-dom";
import type { RifugioType } from "../../types";

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
      <div className="flex items-center flex-col">
        <h1>{rifugio.name}</h1>
        <img className="w-24 h-24" src={rifugio.image} alt="" />
      </div>
    </>
  );
}

export default Rifugio;
