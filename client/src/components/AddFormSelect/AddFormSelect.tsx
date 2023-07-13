import React from "react";
import "./AddFormSelect.scss";
import { FormikProps } from "formik";

type Props = {
  formik: FormikProps<FormikValues>;
};

const AddFormSelect: React.FC<Props> = (props: Props) => {
  return (
    <div className="add-form-group">
      <label htmlFor="productType">Type Switcher</label>
      <div className="add-form-field-container">
        <select placeholder="Type Switcher" id="productType" className="add-form-field" {...props.formik.getFieldProps("productType")}>
          <option value="" hidden disabled>
            --Choose An Option--
          </option>
          <option id="DVD" value="DVD">
            DVD
          </option>
          <option id="Book" value="Book">
            Book
          </option>
          <option id="Furniture" value="Furniture">
            Furniture
          </option>
        </select>
        {props.formik.touched["productType"] && props.formik.errors["productType"] && <p className="add-form-field-errmsg">{props.formik.errors["productType"] || ""}</p>}
      </div>
    </div>
  );
};

export default AddFormSelect;
