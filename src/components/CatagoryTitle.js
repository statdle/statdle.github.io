import React from "react";
import catagoryNames from "../assets/catagoryNames.json";
import catagoryDescription from "../assets/catagoryDescription.json";

//props: title <"name">
let CatagoryTitle = (props) => {
  return (
    <details>
      <summary className="catagory-title">{catagoryNames[props.title]}</summary>
      <p>{catagoryDescription[props.title]}</p>
    </details>
  );
};

export default CatagoryTitle;
