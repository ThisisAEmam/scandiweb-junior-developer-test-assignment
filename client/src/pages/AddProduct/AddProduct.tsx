import React, { useState } from "react";
import "./AddProduct.scss";
import Header from "../../components/Header/Header";
import { NavigateFunction, useNavigate } from "react-router-dom";
import AddProductForm from "../../containers/AddProductForm/AddProductForm";

type Props = {};

const AddProduct: React.FC<Props> = () => {
  const [addClickState, setAddClickState] = useState<boolean>(false);

  const handleAddProduct = () => {
    setAddClickState(true);
    setTimeout(() => {
      setAddClickState(false);
    }, 500);
  };

  const navigate: NavigateFunction = useNavigate();

  const buttons: Button[] = [
    {
      text: "Save",
      onClick: handleAddProduct,
    },
    {
      text: "Cancel",
      onClick: () => {
        navigate("/");
      },
    },
  ];

  return (
    <section className="app__add-product-page">
      <Header title="Product Add" buttons={buttons} />
      <AddProductForm onAddClick={addClickState} navigate={navigate} />
    </section>
  );
};

export default AddProduct;
