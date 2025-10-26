import { useState } from "react";
import "./App.css";

function App() {
  const [data, setdata] = useState<any[]>([]);

  const doSomething = async () => {
    try {
      const response = await fetch("http://localhost:8080/rifugios");
      const data = await response.json();
      setdata(data);
      console.log(data);
      // const data = await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <>
      <div>Hello World</div>
      <button onClick={doSomething}>Press me </button>
      <div className="bg-blue-500">hhshfbsdhf</div>
      <ul>
        {data.map((rifugio) => (
          <li key={rifugio._id}>
            {rifugio.name}
            <img src={rifugio.image} alt="" className="w-24 h-24" />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
