import React from "react";
import catagoryNames from "../../../assets/catagoryNames.json";
import catagoryDescription from "../../../assets/catagoryDescription.json";
import './catagoryTitle.scss';

//props: title <"name">
const CatagoryTitle = (props) => {
  return (
    <details >
      <summary role="button" className="catagory-title">{catagoryNames[props.title]}</summary>
      <p className="catagory-description">{catagoryDescription[props.title]}</p>
    </details>
  );
};

export default CatagoryTitle;
