import React from "React";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// import renderer from "react-test-renderer";
// import { CATEGORYTEXT } from "../../../assets/data";
import CatagoryGroup from "./CatagoryGroup";


test("conventional case", () => {
    const active = [0, 0, 1, 0];
    const values = ["0",{"target":2,"high":1,"highValues":["AF","Afghanistan","Afghanistan"],"low":194,"lowValues":["ZW","Zimbabwe","Zimbabwe"],"activeRow":2}];
    
    const {container} = render(<CatagoryGroup active={active} values={values} />);


    const rows = container.querySelectorAll('.row-group');
    const countries = container.querySelectorAll('.country-name');
    const ranks = container.querySelectorAll('.rank-number');
    
    // correct things are displayed
    expect(countries[0]).toHaveTextContent("Afghanistan");
    expect(ranks[0]).toHaveTextContent("1");

    expect(countries[1]).toHaveTextContent("Zimbabwe");
    expect(ranks[1]).toHaveTextContent("194");

    for(let i in rows[2].childNodes.length){
        expect(rows[2].childNodes[i]).toHaveClass("active");
    }
});

test("win case", () => {
    const active = [0, 0, 1, 0];
    const values = ["0", {"target":2,"high":2,"highValues":["AD","Andorra","Andorra"],"low":2,"lowValues":["AD","Andorra","Andorra"],"activeRow":1}];
    
    const {container} = render(<CatagoryGroup active={active} values={values} />);


    const rows = container.querySelectorAll('.row-group');
    const countries = container.querySelectorAll('.country-name');
    const ranks = container.querySelectorAll('.rank-number');
    
    // correct things are displayed
    expect(countries[0]).toHaveTextContent("Andorra");
    expect(ranks[0]).toHaveTextContent("2");

    expect(countries[1]).toHaveTextContent("Andorra");
    expect(ranks[1]).toHaveTextContent("2");

    
    expect(rows.length).toEqual(4);
    for(let i in rows.length){
        console.log(i);
        expect(rows[j].childNodes.length).toEqual(3);
        for(let j in rows[j].childNodes.length){
            expect(rows[i].childNodes[j]).toHaveClass("actdve");
        }
    }
});