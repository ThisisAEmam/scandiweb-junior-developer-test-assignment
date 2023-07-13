import React, { useEffect, useState } from "react";
import "./Products.scss";
import ProductsList from "../../containers/ProductsList/ProductsList";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { productsTestData } from "./testData";

type Props = {};

const Products: React.FC<Props> = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleCheck = (sku: string, selected: boolean) => {
    if (selected && !selectedProducts.includes(sku)) {
      setSelectedProducts([...selectedProducts, sku]);
    } else if (!selected) {
      setSelectedProducts([...selectedProducts.filter((item) => item !== sku)]);
    }
  };

  useEffect(() => {
    setProducts(productsTestData);
  }, []);

  const navigate: NavigateFunction = useNavigate();

  const massDeleteHandler = () => {
    setProducts([...products.filter((item: ProductType) => !selectedProducts.includes(item.sku))]);
  };

  const buttons: Button[] = [
    {
      text: "ADD",
      onClick: () => navigate("/add-product"),
    },
    {
      text: "MASS DELETE",
      onClick: massDeleteHandler,
      id: "delete-product-btn",
    },
  ];

  return (
    <div className="products-page">
      <Header title="Product List" buttons={buttons} />
      <ProductsList products={products} onSelectionCheck={handleCheck} />
    </div>
  );
};

export default Products;
