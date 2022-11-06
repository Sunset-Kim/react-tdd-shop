import React from "react";
import { IProductsApi, ProductsState } from "../../contexts/ProductsProvider";

interface ProductsProps {
  products: ProductsState["products"];
  price: number;
  onUpdateCount: IProductsApi["updateCount"];
}

const Products: React.FC<ProductsProps> = ({
  products,
  price,
  onUpdateCount,
}) => {
  const handleChangeCount = (id: number, price: number, value: string) => {
    const count = Number(value) < 0 ? 0 : Number(value);
    onUpdateCount("products", id, count);
  };

  return (
    <div>
      <h2>Products</h2>

      <h3>{`Total: ${price}`}</h3>

      {products &&
        products.map((product) => (
          <div key={product.id}>
            <img src={product.imgPath} alt={product.name} />
            <span>price: {product.price}</span>

            <div>
              <label htmlFor={product.name}>{product.name}</label>
              <input
                onChange={(e) =>
                  handleChangeCount(
                    product.id,
                    product.price,
                    e.currentTarget.value
                  )
                }
                id={product.name}
                type='number'
                value={product.count}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
