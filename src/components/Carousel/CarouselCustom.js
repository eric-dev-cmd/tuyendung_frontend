import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { GlobalData } from '../../data/globalData';
const images = GlobalData.carouselImageCustom()

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", color: "gray" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", color: "gray" }}
            onClick={onClick}
        />
    );
}


const CarouselCustom = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }
    return (
        <div className="carousel border-top mb-2">
            <Slider {...settings}>
                {images.map((item, index) => {
                    return <div key={index} className="carousel-image">
                        <img src={item.image} alt="carousel" style={{ height: "207px" }} />
                    </div>
                })}
            </Slider>
        </div>
    )
}

export default CarouselCustom
