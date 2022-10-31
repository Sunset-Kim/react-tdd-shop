import { rest } from "msw";

export interface Product {
  name: string;
  price: number;
  imagePath: string;
}

export interface Option {
  name: string;
  price: number;
}

export const handlers = [
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(
      ctx.json<Product[]>([
        {
          name: "America",
          price: 50000,
          imagePath: "/images/america.jpeg",
        },
        {
          name: "Korea",
          price: 10000,
          imagePath: "/images/korea.jpeg",
        },
      ])
    );
  }),
  rest.get("http://localhost:5000/options", (req, res, ctx) => {
    return res(
      ctx.json<Option[]>([
        {
          name: "Dinner",
          price: 100000,
        },
        {
          name: "First-Class",
          price: 100000,
        },
      ])
    );
  }),
];
