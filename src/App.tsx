import { useState } from "react";
import "./App.css";
import ProductsProvider from "./contexts/ProductsProvider";
import OrderPage from "./pages/OrderPage/OrderPage";
import SummaryPage from "./pages/SummaryPage/SummaryPage";

function App() {
  return (
    <div className='App'>
      <ProductsProvider>
        <OrderPage />
      </ProductsProvider>
    </div>
  );
}

export default App;
