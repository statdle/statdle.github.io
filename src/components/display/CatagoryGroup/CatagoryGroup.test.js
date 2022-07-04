import React from "React";
import renderer from "react-test-renderer";
import CatagoryGroup from "./CatagoryGroup";

test("renders", () => {
    const component = renderer.create(<CatagoryGroup    active={[1, 0, 0, 0]} 
                                                        values={["f", {high: 10, highName: "Azerbaijan", low: 30, lowName: "Central African Republic", target: "2", activeRow: 0}]}/>).toJSON();
    console.log(component);
});
