import React from "react";
import CatagoryGroup from "../display/CatagoryGroup/CatagoryGroup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import { Navigation } from "swiper";
import { Pagination } from "swiper";
const ModalHowExamples = () => {
    const example1 = (
        <div className="onboard-example" key={"ex1"}
        >
            <CatagoryGroup
                values={[
                    "alp",
                    {
                        high: 10,
                        highName: "Austria",
                        low: 0,
                        lowName: "",
                        target: 20,
                    },
                ]}
                active={[0, 1, 0, 0]}
            />
        </div>
    );

    const example2 = (
        <div className="onboard-example" key={"ex2"}
        >
            <CatagoryGroup
                values={[
                    "alp",
                    {
                        high: 10,
                        highName: "Austria",
                        low: 30,
                        lowName: "Cambodia",
                        target: 20,
                    },
                ]}
                active={[0, 0, 1, 0]}
            />
        </div>
    );

    const example3 = (
        <div className="onboard-example" key={"ex3"}
        >
            <CatagoryGroup
                values={[
                    "alp",
                    {
                        high: 10,
                        highName: "Austria",
                        low: 30,
                        lowName: "Cambodia",
                        target: 20,
                    },
                ]}
                active={[0, 0, 0, 1]}
            />
        </div>
    );

    const example4 = (
        <div className="onboard-example" key={"ex4"}
        >
            <CatagoryGroup
                values={[
                    "alp",
                    {
                        high: 20,
                        highName: "Bhutan",
                        low: 20,
                        lowName: "Bhutan",
                        target: 20,
                    },
                ]}
                active={[0, 1, 1, 0]}
            />
        </div>
    );

    return (
        <Swiper navigation={true} modules={[Navigation, Pagination]} pagination={true} className="modal__swiper">
            <SwiperSlide>
                {example1}
                <p className="swiper__text">
                    <em>Austria</em>, #10 alphabetically, is higher ranked than the <em>Secret Country</em>
                </p>
            </SwiperSlide>
            <SwiperSlide>
                {example2}
                <p className="swiper__text"><em>Cambodia</em>, #30 alphabetically, is lower ranked than the <em>Secret Country</em>
                </p>
            </SwiperSlide>
            <SwiperSlide>
                {example3}
                <p className="swiper__text">A country like <em>Denmark</em> is lower ranked than <em>Cambodia</em>
                </p>
            </SwiperSlide>
            <SwiperSlide>
                {example4}
                <p className="swiper__text"><em>Bhutan</em>, #20th alphabetically, is the <em>Secret Country!</em>
                </p>
            </SwiperSlide>
        </Swiper>
    );
};

export default ModalHowExamples;