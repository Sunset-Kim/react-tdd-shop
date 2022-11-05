import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "../mocks/data/type";

type ProductsType = "options" | "products";
export type ProductsState = Record<ProductsType, Map<string, Info>>;

export interface IProductsApi {
  updateCount: (type: ProductsType, name: string, count: number) => void;
}

export interface Info {
  imgPath: string;
  count: number;
  price: number;
}

export const ProductsState = createContext(null);

export const ProductsStateCtx = createContext<ProductsState | null>(null);
export const ProductsApi = createContext<IProductsApi | null>(null);

const CouterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState({
    options: new Map<string, Info>(),
    products: new Map<string, Info>(),
  });
  const [products, setProducts] = useState<Product[]>();

  const updateCount = useCallback(
    (type: ProductsType, name: string, number: number) => {
      setCount((prev) => {
        const newState = { ...prev };
        const newValue = newState[type].get(name)!;
        newState[type].set(name, { ...newValue, count: number });
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

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((data) => data.json())
      .then((products) =>
        setProducts(
          products.map((product: Product) => {
            count.products.set(product.name, {
              imgPath: product.imagePath,
              count: 0,
              price: product.price,
            });
          })
        )
      );
  }, []);

  return (
    <ProductsStateCtx.Provider value={{ ...count, ...products }}>
      <ProductsApi.Provider value={api}>{children}</ProductsApi.Provider>
    </ProductsStateCtx.Provider>
  );
};

export default CouterProvider;
