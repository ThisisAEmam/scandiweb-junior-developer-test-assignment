import React from "react";
import "./AddFormField.scss";
import { FormikProps } from "formik";

type Props = {
  field: AddProductField;
  formik: FormikProps<FormikValues>;
};

const AddFormField: React.FC<Props> = (props: Props) => {
  return (
    <div className="add-form-group">
      <label htmlFor={props.field.type}>{props.field.text}</label>
      <div className="add-form-field-container">
        <input type="text" placeholder={`#${props.field.type}`} id={props.field.type} className="add-form-field" {...props.formik.getFieldProps(props.field.type)} />
        {props.formik.touched[props.field.type] && props.formik.errors[props.field.type] ? <p className="add-form-field-errmsg">{props.formik.errors[props.field.type]}</p> : null}
      </div>
    </div>
  );
};

export default AddFormField;
