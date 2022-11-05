import React, { useEffect, useState } from "react";
import { Product } from "../../mocks/data/type";

const Products = () => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((data) => data.json())
      .then((products) => setProducts(products));
  }, []);

  return (
    <div>
      <h2>Products</h2>

      <h3>Price: </h3>

      {products &&
        products.map((product) => (
          <div key={product.name}>
            <img src={product.imagePath} alt={product.name} />
            <span>price: {product.price}</span>

            <div>
              <label htmlFor={product.name}>{product.name}</label>
              <input id={product.name} type='number' defaultValue={0} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
