import React, { useEffect, useRef, useState } from "react";
import "./AddProductForm.scss";
import { FormikProps, useFormik } from "formik";
import { formSchema } from "./validationSchema";
import AddFormField from "../../components/AddFormField/AddFormField";
import AddFormSelect from "../../components/AddFormSelect/AddFormSelect";
import { bookFields, commonFields, dvdFields, furnitureFields } from "./fields";
import { formInitialValues } from "./formInitialValues";
import { NavigateFunction } from "react-router-dom";

type Props = {
  onAddClick: boolean;
  navigate: NavigateFunction;
};

const AddProductForm: React.FC<Props> = (props: Props) => {
  const [selectedType, setSelectedType] = useState<SwitchSelectedType>("Not specified");
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (values: FormikValues) => {
    let data = {};
    for (const key in values) {
      const value = values[key as keyof FormikValues];
      if (["price", "size", "height", "width", "length", "weight"].includes(key) && value !== "") {
        data = { ...data, [key]: +value };
      } else {
        data = { ...data, [key]: value };
      }
    }
    console.log(data);
    props.navigate("/");
  };

  const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
    initialValues: formInitialValues,
    onSubmit: handleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (formik.values.type && ["DVD", "Book", "Furniture"].includes(formik.values.type)) {
      setSelectedType(formik.values.type as any);
      console.log();
    } else {
      setSelectedType("Not specified");
    }
  }, [formik.values.type]);

  useEffect(() => {
    if (props.onAddClick && submitBtnRef.current) {
      console.log(submitBtnRef.current);
      submitBtnRef.current?.click();
      console.log("Clicked!!");
    }
  }, [props.onAddClick]);

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
          <p className="add-form-attrDesc">* Please provide dimensions in HxWxL format.</p>
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
