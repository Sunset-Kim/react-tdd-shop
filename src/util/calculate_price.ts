import { OptionState } from "./../contexts/ProductsProvider";
import { ProductCountState } from "../contexts/ProductsProvider";

export const calcProductsPice = (products: ProductCountState[]) => {
  const sum = products.reduce((a: number, c: ProductCountState) => {
    a += c.price * c.count;
    return a;
  }, 0);
  return sum;
};

export const calcOptionPrice = (options: OptionState[]) =>
  options.reduce((a: number, c: OptionState) => {
    a += c.price * (c.checked ? 1 : 0);
    return a;
  }, 0);
