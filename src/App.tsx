import { useCallback, useState } from "react";
import ProductsProvider from "./contexts/ProductsProvider";
import CompletePage from "./pages/CompletePage/CompletePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import SummaryPage from "./pages/SummaryPage/SummaryPage";

function App() {
  const [step, setStep] = useState<number>(0);

  const handleChangeStep = useCallback(
    () => (step: number) => setStep(step),
    [setStep]
  );

  return (
    <div className='App'>
      <ProductsProvider>
        {step === 0 && <OrderPage />}
        {step === 1 && <SummaryPage />}
        {step === 2 && <CompletePage />}
      </ProductsProvider>
    </div>
  );
}

export default App;
