import { useContext } from "react";
import { StepApiContext, StepStateContext } from "./contexts/StepContext";

import CompletePage from "./pages/CompletePage/CompletePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import SummaryPage from "./pages/SummaryPage/SummaryPage";

function App() {
  const { step } = useContext(StepStateContext);
  const { onNext, onReset, onPrev, setStep } = useContext(StepApiContext);

  return (
    <div className='App'>
      {step === 0 && <OrderPage onChangeStep={setStep} />}
      {step === 1 && <SummaryPage onChangeStep={setStep} />}
      {step === 2 && <CompletePage onChangeStep={setStep} />}
    </div>
  );
}

export default App;
