import React from "react";
import { IProductsApi, ProductsState } from "../../contexts/ProductsProvider";
import { calcProductsPice } from "../../util/calculate_price";

interface ProductsProps {
  products: ProductsState["products"];
  onUpdateCount: IProductsApi["updateCount"];
}

const Products: React.FC<ProductsProps> = ({ products, onUpdateCount }) => {
  const handleChangeCount = (id: number, value: string) => {
    const count = Number(value) < 0 ? 0 : Number(value);
    onUpdateCount(id, count);
  };

  return (
    <div>
      <h2>Products</h2>

      <h3>{`Prodcuts Price: $${calcProductsPice(products) ?? 0}`}</h3>

      {products &&
        products.map((product) => (
          <div key={product.id}>
            <img src={product.imgPath} alt={product.name} />
            <span>price: {product.price}</span>

            <div>
              <label htmlFor={product.name}>{product.name}</label>
              <input
                onChange={(e) =>
                  handleChangeCount(product.id, e.currentTarget.value)
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
