import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Menu } from "./pages/Menu/Menu";
import { Statistics } from "./pages/Statistics/Statistics";
import { Error } from "./pages/Error/Error";
import { Info } from "./pages/Info/Info";
import { History } from "./pages/History/History";
import { Tir } from "./pages/Tir/Tir";
import { InputField } from "./pages/InputField/InputField";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      // { path: "main", element: <Main /> },
      { path: "statistics", element: <Statistics /> },
      { path: "info", element: <Info /> },
      { path: "inputField", element: <InputField save={true} /> },
      { path: "history", element: <History /> },
      { path: "tir", element: <Tir /> },
    ],
  },
  { path: "*", element: <Error /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
