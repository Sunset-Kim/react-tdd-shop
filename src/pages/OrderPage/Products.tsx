import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  IProductsApi,
  ProductsApi,
  ProductsState,
  ProductsStateCtx,
} from "../../contexts/ProductsProvider";

const Products = () => {
  const { updateCount } = useContext(ProductsApi) as IProductsApi;
  const { products } = useContext(ProductsStateCtx) as ProductsState;

  const handleChangeCount = (name: string, price: number, value: string) => {
    const count = Number(value) < 0 ? 0 : Number(value);
    updateCount("products", name, count);
  };

  const calcPrice = (products: ProductsState["products"]) => {
    let sum = 0;
    products.forEach((value, key) => {
      sum += value.count * value.price;
    });
    return sum;
  };

  return (
    <div>
      <h2>Products</h2>

      <h3>{`Total: ${calcPrice(products)}`}</h3>

      {products &&
        Array.from(products).map(([name, product]) => (
          <div key={name}>
            <img src={product.imgPath} alt={name} />
            <span>price: {product.price}</span>

            <div>
              <label htmlFor={name}>{name}</label>
              <input
                onChange={(e) =>
                  handleChangeCount(name, product.price, e.currentTarget.value)
                }
                id={name}
                type='number'
                defaultValue={0}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
