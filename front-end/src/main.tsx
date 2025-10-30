import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound, Rifugio } from "./components/index.ts";
import "leaflet/dist/leaflet.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/rifugio/:id", element: <Rifugio /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
