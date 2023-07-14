import React from "react";
import "./Loader.scss";

type Props = {};

const Loader: React.FC<Props> = () => {
  return (
    <div className="PageLoader">
      <div className="ldsRing">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
