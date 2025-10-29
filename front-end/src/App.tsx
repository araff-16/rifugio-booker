import { useEffect, useState } from "react";
import "./App.css";
import type { RifugioType } from "./types";
import { useNavigate } from "react-router-dom";

function App() {
  const [data, setdata] = useState<RifugioType[]>([]);
  const navigate = useNavigate(); // <-- get the navigate function from the hook

  useEffect(() => {
    // Make API call using the id
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/rifugios`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setdata(data ?? []);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchData();
  }, []); // re-run if id changes

  const openInfo = (id: string) => {
    navigate(`/rifugio/${id}`);
  };

  if (data.length === 0) return <p>Loading...</p>;

  return (
    <>
      {/* <button onClick={doSomething}>Press me </button> */}
      <ul>
        {data.map((rifugio) => (
          <div
            className="rounded border-2 border-gray-200 px-5 py-3 my-3 hover:bg-gray-500 cursor-pointer"
            onClick={() => openInfo(rifugio._id)}
          >
            <li key={rifugio._id}>
              {rifugio.name}
              <img src={rifugio.image} alt="" className="w-24 h-24" />
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
