import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Main } from "./pages/Main/Main";
import { Menu } from "./pages/Menu/Menu";
import { Result } from "./pages/Result/Result";
import { WinRate } from "./pages/WinRate/WinRate";
import { Error } from "./pages/Error/Error";
import { Info } from "./pages/Info/Info";
import { History } from "./pages/History/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      { path: "main", element: <Main /> },
      { path: "result", element: <Result /> },
      { path: "winrate", element: <WinRate /> },
      { path: "info", element: <Info/> },
      { path: "history", element: <History/> }
    ],
  },
  { path: "*", element: <Error /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
