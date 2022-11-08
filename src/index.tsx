import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProductsProvider from "./contexts/ProductsProvider";
import { StepProvider } from "./contexts/StepContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <StepProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </StepProvider>
  </React.StrictMode>
);
