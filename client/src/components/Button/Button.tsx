import React from "react";
import "./Button.scss";

type Props = Button;

const Button: React.FC<Props> = (props: Props) => {
  return (
    <button className="app__header-btn" type={props.text === "save" ? "submit" : "button"} id={props.id} onClick={props.onClick.bind(this)}>
      {props.text}
    </button>
  );
};

export default Button;
