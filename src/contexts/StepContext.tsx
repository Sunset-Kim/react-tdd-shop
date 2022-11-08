import { createContext, PropsWithChildren, useMemo, useReducer } from "react";

const initialState: StepState = {
  step: 0,
};

const api: StepApi = {
  onNext: () => {},
  onPrev: () => {},
  onReset: () => {},
};

export interface StepState {
  step: number;
}

export interface Action {
  type: string;
}

export interface StepApi {
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}

export const StepStateContext = createContext(initialState);
export const StepApiContext = createContext(api);

const MAX_STEP = 2;

export const stepReducer = (state: StepState, action: Action) => {
  switch (action?.type) {
    case "NEXT":
      return { step: state.step + 1 };

    case "PREV":
      return { step: state.step - 1 };

    case "RESET":
      return { step: 0 };
    default:
      return state;
  }
};

export const StepProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispath] = useReducer(stepReducer, initialState);
  const api = useMemo(
    () => ({
      onNext: () => {
        dispath({ type: "NEXT" });
      },
      onPrev: () => {
        dispath({ type: "PREV" });
      },
      onReset: () => {
        dispath({ type: "RESET" });
      },
    }),
    [dispath]
  );

  return (
    <StepStateContext.Provider value={state}>
      <StepApiContext.Provider value={{ ...api }}>
        {children}
      </StepApiContext.Provider>
    </StepStateContext.Provider>
  );
};
