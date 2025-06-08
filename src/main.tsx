import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Main } from "./pages/Main/Main";
import { Menu } from "./pages/Menu/Menu";
import { Statistics} from "./pages/Statistics/Statistics";
import { Error } from "./pages/Error/Error";
import { Info } from "./pages/Info/Info";
import { History } from "./pages/History/History";
import { InputField } from "./pages/InputField/InputField";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      { path: "main", element: <Main /> },
      { path: "statistics", element: <Statistics /> },
      { path: "info", element: <Info/> },
      { path: "history", element: <History/> },
      { path: "inputfield", element: <InputField/> }
    ],
  },
  { path: "*", element: <Error /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
