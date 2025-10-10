import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import NotFound from "./components/NotFound";
import GeneralError from "./components/GeneralError";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./main.css";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  scrollRestoration: true,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: GeneralError,
  routeTree,
});

const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
