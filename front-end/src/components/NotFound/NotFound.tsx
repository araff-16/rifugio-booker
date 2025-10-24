import { useState } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>the componenet you are looking for does not exist</div>
      <Link to="/">
        <button>Go Back Home</button>
      </Link>
    </>
  );
}

export default NotFound;
