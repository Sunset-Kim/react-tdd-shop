import { createContext, useCallback, useMemo, useState } from "react";

type CountType = "orderCount" | "productCount";
type CountStateType = Record<CountType, Map<string, number>>;

interface ICountApi {
  updateCount: (type: CountType, name: string, count: number) => void;
}

export const CountStateCtx = createContext<CountStateType | null>(null);
export const CountApiCtx = createContext<ICountApi | null>(null);

const CouterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState({
    orderCount: new Map<string, number>(),
    productCount: new Map<string, number>(),
  });

  const updateCount = useCallback(
    (type: CountType, name: string, number: number) => {
      setCount((prev) => {
        const newState = { ...prev };
        newState[type].set(name, number);

        return newState;
      });
    },
    [setCount]
  );
  const api = useMemo(
    () => ({
      updateCount,
    }),
    [updateCount]
  );

  return (
    <CountStateCtx.Provider value={{ ...count }}>
      <CountApiCtx.Provider value={api}>{children}</CountApiCtx.Provider>
    </CountStateCtx.Provider>
  );
};

export default CouterProvider;
