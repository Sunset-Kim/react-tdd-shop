import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Option, Product } from "../mocks/data/type";

export type ProductsType = "options" | "products";

export interface IProductsApi {
  updateCount: (id: number, count: number) => void;
  updateOption: (id: number, checked: boolean) => void;
}

export type ProductsState = {
  products: ProductCountState[];
  options: OptionState[];
};

export interface ProductCountState extends Product {
  count: number;
  price: number;
}

export interface OptionState extends Option {
  checked: boolean;
}

export const ProductsStateCtx = createContext<ProductsState | null>(null);
export const ProductsApiCtx = createContext<IProductsApi | null>(null);

export default function ProductsProvider({
  children,
}: React.PropsWithChildren) {
  const [state, setState] = useState<ProductsState>({
    options: [],
    products: [],
  });

  const updateCount = useCallback(
    (id: number, number: number) => {
      setState((prev) => {
        const newProduct = prev.products.map((product) => {
          if (product.id === id) {
            product.count = number;
            return product;
          }
          return product;
        });

        const newState = { ...prev, products: [...newProduct] };

        return newState;
      });
    },
    [setState]
  );

  const updateOption = useCallback(
    (id: number, checked: boolean) => {
      setState((prev) => {
        const newProduct = prev.options.map((opt) => {
          if (opt.id === id) {
            opt.checked = checked;
            return opt;
          }
          return opt;
        });

        const newState = { ...prev, options: [...newProduct] };

        return newState;
      });
    },
    [setState]
  );

  const api = useMemo(
    () => ({
      updateCount,
      updateOption,
    }),
    [updateCount, updateOption]
  );

  useEffect(() => {
    fetch("http://localhost:5000/options")
      .then((data) => data.json())
      .then((options) =>
        setState((prev) => {
          const newState = {
            ...prev,
            options: options.map((opt: Option) => ({
              ...opt,
              checked: false,
            })),
          };
          return newState;
        })
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((data) => data.json())
      .then((products) =>
        setState((prev) => {
          const newState = {
            ...prev,
            products: products.map((product: Product) => ({
              ...product,
              count: 0,
            })),
          };
          return newState;
        })
      );
  }, []);

  return (
    <ProductsStateCtx.Provider value={{ ...state }}>
      <ProductsApiCtx.Provider value={api}>{children}</ProductsApiCtx.Provider>
    </ProductsStateCtx.Provider>
  );
}
