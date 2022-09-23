import {React} from "react";
import { DATA, CATEGORYTEXT } from "../../../assets/data";
import './catagoryTitle.scss';
//props: index
const CatagoryTitle = (props) => {

  return (
    <details>
      <summary role="button" className="catagory-title">{CATEGORYTEXT[props.index][0]}</summary>
        <p className="catagory-description">{CATEGORYTEXT[props.index][1]}</p>
        <p className="catagory-description">{"#1: " + DATA[CATEGORYTEXT[props.index][2]][0][1]}</p>
        <p className="catagory-description">{"#194: " + DATA[CATEGORYTEXT[props.index][3]][0][1]}</p>
    </details>
  );
};
export default CatagoryTitle;
