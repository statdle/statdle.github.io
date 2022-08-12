import React, { useState } from "react";
import CatagoryGroup from "../display/CatagoryGroup/CatagoryGroup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";


const ModalHowExamples = () => {
    const [count, setCount] = useState(0);
    const values = [[
        "alp",
        {
            high: 10,
            highName: "Austria",
            low: 0,
            lowName: "",
            target: 20,
        },
    ], [
        "alp",
        {
            high: 10,
            highName: "Austria",
            low: 30,
            lowName: "Cambodia",
            target: 20,
        },
    ], [
        "alp",
        {
            high: 10,
            highName: "Austria",
            low: 30,
            lowName: "Cambodia",
            target: 20,
        },
    ], [
        "alp",
        {
            high: 20,
            highName: "Bhutan",
            low: 20,
            lowName: "Bhutan",
            target: 20,
        },
    ]];
    const active = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [0, 1, 1, 0]];

    return (
        <>
            <div className="onboard-example">
                <CatagoryGroup values={values[count]} active={active[count]} />
            </div>
            <Swiper navigation={window.innerWidth > 550 ? true : false}
                modules={[Navigation, Pagination]}
                pagination={true}
                className="modal__swiper"
                onSlideChange={(swiper) => setCount(swiper.realIndex)}
            >
                <SwiperSlide>
                    <p className="swiper__text">
                        <em>Austria</em>, #10 alphabetically, is higher ranked than the <em>Secret Country</em>
                    </p>
                </SwiperSlide>
                <SwiperSlide>
                    <p className="swiper__text"><em>Cambodia</em>, #30 alphabetically, is lower ranked than the <em>Secret Country</em>
                    </p>
                </SwiperSlide>
                <SwiperSlide>
                    <p className="swiper__text">A country like <em>Denmark</em> is lower ranked than <em>Cambodia</em>, shown with a line
                    </p>
                </SwiperSlide>
                <SwiperSlide>
                    <p className="swiper__text"><em>Bhutan</em>, #20th alphabetically, is the <em>Secret Country!</em>
                    </p>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default ModalHowExamples;