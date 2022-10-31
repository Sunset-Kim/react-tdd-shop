import { rest } from "msw";
import { OPTIONS, PRODUCTS } from "./data";
import { Option, Product } from "./data/type";

export const handlers = [
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(ctx.json<Product[]>(PRODUCTS));
  }),
  rest.get("http://localhost:5000/options", (req, res, ctx) => {
    return res(ctx.json<Option[]>(OPTIONS));
  }),
];
