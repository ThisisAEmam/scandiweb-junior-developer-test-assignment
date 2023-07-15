import React, { useEffect, useRef, useState } from "react";
import "./AddProductForm.scss";
import { FormikProps, useFormik } from "formik";
import { formSchema } from "./validationSchema";
import AddFormField from "../../components/AddFormField/AddFormField";
import AddFormSelect from "../../components/AddFormSelect/AddFormSelect";
import { bookFields, commonFields, dvdFields, furnitureFields } from "./fields";
import { formInitialValues } from "./formInitialValues";
import { NavigateFunction } from "react-router-dom";
import Loader from "../../hoc/Loader/Loader";
import axios from "axios";

type Props = {
  onAddClick: boolean;
  navigate: NavigateFunction;
};

const AddProductForm: React.FC<Props> = (props: Props) => {
  const [selectedType, setSelectedType] = useState<SwitchSelectedType>("Not specified");
  const [loader, setLoader] = useState<boolean>(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (values: FormikValues) => {
    setLoader(true);
    let data = {};
    let attributes = {};
    for (const key in values) {
      const value = values[key as keyof FormikValues];
      if (["size", "height", "width", "length", "weight"].includes(key)) {
        if (value !== "") {
          attributes = { ...attributes, [key]: +value };
        }
      } else if (key === "price") {
        data = { ...data, [key]: +value };
      } else {
        data = { ...data, [key]: value };
      }
    }
    data = { ...data, attributes };
    axios
      .post("/products/", data)
      .then(() => {
        formik.setValues(formInitialValues);
        setLoader(false);
        props.navigate("/");
      })
      .catch((err) => {
        if (err.response.data.msg === "This product's sku already exists") {
          formik.setErrors({ ...formik.errors, sku: err.response.data.msg });
        } else {
          console.error(err.response);
        }
        setLoader(false);
      });
  };

  const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
    initialValues: formInitialValues,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (formik.values.productType && ["DVD", "Book", "Furniture"].includes(formik.values.productType)) {
      setSelectedType(formik.values.productType as any);
    } else {
      setSelectedType("Not specified");
    }
  }, [formik.values.productType]);

  useEffect(() => {
    if (props.onAddClick && submitBtnRef.current) {
      submitBtnRef.current?.click();
    }
  }, [props.onAddClick]);

  if (loader) {
    return <Loader />;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="add-form" id="product_form">
      {commonFields.map((item: AddProductField, index: number) => (
        <AddFormField formik={formik} key={index} field={item} />
      ))}
      <AddFormSelect formik={formik} />
      {selectedType === "DVD" ? (
        <>
          {dvdFields.map((item: AddProductField, index: number) => (
            <AddFormField formik={formik} key={index} field={item} />
          ))}
          <p className="add-form-attrDesc">* Please provide the DVD size in Mega-Bytes.</p>
        </>
      ) : selectedType === "Furniture" ? (
        <>
          {furnitureFields.map((item: AddProductField, index: number) => (
            <AddFormField formik={formik} key={index} field={item} />
          ))}
          <p className="add-form-attrDesc">* Please provide dimensions in CM.</p>
        </>
      ) : selectedType === "Book" ? (
        <>
          {bookFields.map((item: AddProductField, index: number) => (
            <AddFormField formik={formik} key={index} field={item} />
          ))}
          <p className="add-form-attrDesc">* Please provide the Book weight in Kilo-Grams.</p>
        </>
      ) : null}

      <button type="submit" className="add-form-submit" ref={submitBtnRef}>
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
