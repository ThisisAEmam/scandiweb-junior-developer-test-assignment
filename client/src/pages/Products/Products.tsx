import React, { useEffect, useState } from "react";
import "./Products.scss";
import ProductsList from "../../containers/ProductsList/ProductsList";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "axios";

type Props = {};

const Products: React.FC<Props> = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [areProductsDeleted, setAreProductsDeleted] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleCheck = (sku: string, selected: boolean) => {
    if (selected && !selectedProducts.includes(sku)) {
      setSelectedProducts([...selectedProducts, sku]);
    } else if (!selected) {
      setSelectedProducts([...selectedProducts.filter((item) => item !== sku)]);
    }
  };

  const fetchProducts = async () => {
    axios
      .get("/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    (async () => {
      await fetchProducts();
    })();
  }, []);

  useEffect(() => {
    if (areProductsDeleted) {
      (async () => {
        await fetchProducts();
      })();
    }
  }, [areProductsDeleted]);

  const navigate: NavigateFunction = useNavigate();

  const massDeleteHandler = async () => {
    axios
      .delete("/products/", { data: [...selectedProducts] })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "Products deleted successfully") {
          setAreProductsDeleted(true);
          setTimeout(() => {
            setAreProductsDeleted(false);
          }, 500);
        }
      })
      .catch((err) => {
        console.error(err.request);
      });
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
