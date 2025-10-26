import { useEffect, useState } from "react";

import "./Rifugio.css";
import { useParams } from "react-router-dom";
import type { RifugioType } from "../../types";

function Rifugio() {
  // const [count, setCount] = useState(0)

  const { id } = useParams(); // this gets the id from the route

  const hardid = "68fd1e9d1dfa4eb904cfa6d5";

  console.log("HERRE", id);
  const [rifugio, setrifugio] = useState<RifugioType | null>(null);

  useEffect(() => {
    // Make API call using the id
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:8080/rifugios/${hardid}`);
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
      <div>Hello World</div>

      <h1>{rifugio.name}</h1>
      <img className="w-24 h-24" src={rifugio.image} alt="" />
    </>
  );
}

export default Rifugio;
