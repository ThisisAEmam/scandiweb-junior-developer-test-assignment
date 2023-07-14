import React, { useEffect, useState } from "react";
import "./ProductsList.scss";
import ProductCard from "../../components/ProductCard/ProductCard";

type Props = {
  products: ProductType[];
  onSelectionCheck: (sku: string, selected: boolean) => void;
};

const ProductsList: React.FC<Props> = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (props.products && Array.isArray(props.products)) {
      setProducts(props.products);
    }
  }, [props.products]);

  return (
    <section className="products">
      {products.length !== 0 ? (
        <div className="products-list">
          {products.map((item: ProductType) => (
            <ProductCard key={item.sku} handleCheck={props.onSelectionCheck} {...item} />
          ))}
        </div>
      ) : (
        <div className="products-list-empty">
          <p>No Products Available.</p>
          <p>Please add a product first!</p>
        </div>
      )}
    </section>
  );
};

export default ProductsList;
