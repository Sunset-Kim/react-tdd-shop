import { useContext } from "react";
import { StepStateContext } from "./contexts/StepContext";

import CompletePage from "./pages/CompletePage/CompletePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import SummaryPage from "./pages/SummaryPage/SummaryPage";

function App() {
  const { step } = useContext(StepStateContext);

  return (
    <div className='App'>
      {step === 0 && <OrderPage />}
      {step === 1 && <SummaryPage />}
      {step === 2 && <CompletePage />}
    </div>
  );
}

export default App;
