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

const actions = {
  next: (state: StepState) => ({ step: state.step + 1 }),
  prev: (state: StepState) => ({ step: state.step - 1 }),
  reset: () => ({ step: 0 }),
};

export const stepReducer = (state: StepState, action: Action) => {
  if (!action.type || action.type in actions === false) {
    return state;
  }
  return actions[action.type as keyof typeof actions](state);
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
