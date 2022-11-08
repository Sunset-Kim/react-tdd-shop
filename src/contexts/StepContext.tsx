import { createContext, PropsWithChildren, useMemo, useReducer } from "react";

export interface StepState {
  step: number;
}

export type ActionType = keyof typeof actions;

export interface Action {
  type: ActionType;
  step?: number;
}

export interface StepApi {
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  setStep: (step: number) => void;
}

const initialState: StepState = {
  step: 0,
};

const api: StepApi = {
  onNext: () => {},
  onPrev: () => {},
  onReset: () => {},
  setStep: () => {},
};

export const StepStateContext = createContext(initialState);
export const StepApiContext = createContext(api);

const actions = {
  next: (state: StepState) => ({ step: state.step + 1 }),
  prev: (state: StepState) => ({ step: state.step - 1 }),
  reset: () => ({ step: 0 }),
  setStep: (state: StepState, step?: number) => ({ step: step ?? 0 }),
};

export const stepReducer = (state: StepState, action: Action) => {
  if (!action.type || action.type in actions === false) {
    return state;
  }
  return actions[action.type as keyof typeof actions](state, action.step);
};

export const StepProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispath] = useReducer(stepReducer, initialState);
  const api = useMemo(
    () => ({
      onNext: () => {
        dispath({ type: "next" });
      },
      onPrev: () => {
        dispath({ type: "prev" });
      },
      onReset: () => {
        dispath({ type: "reset" });
      },
      setStep: (step: number) => {
        dispath({ type: "setStep", step });
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
