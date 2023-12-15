import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Film1 from "../assets/Posters/Drive.webp";
import Film2 from "../assets/Posters/BladeRunner2049.webp";
import Film3 from "../assets/Posters/Barbie.webp";
import Film4 from "../assets/Posters/TheNiceGuys.webp";
import Film5 from "../assets/Posters/LaLaLand.webp";
import Film6 from "../assets/Posters/TheFallGuy.webp";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="max-w-8xl mx-auto mt-8">
      <Slider {...settings} className="rounded-lg overflow-hidden">
        <div className="mr-8">
          <img src={Film1} alt="Drive" className="w-full h-auto"/>
        </div>
        <div className="mr-8">
          <img src={Film2} alt="Blade Runner 2049" className="w-full h-auto"/>
        </div>
        <div className="mr-8">
          <img src={Film3} alt="The Fall Guy" className="w-full h-auto"/>
        </div>
        <div className="mr-8">
          <img src={Film4} alt="Barbie" className="w-full h-auto"/>
        </div>
        <div className="mr-8">
          <img src={Film5} alt="La La Land" className="w-full h-auto"/>
        </div>
        <div className="mr-8">
          <img src={Film6} alt="The Nice Guys" className="w-full h-auto"/>
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;