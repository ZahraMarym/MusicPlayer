import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bg1 from '../../Images/bg10.jpg';
import bg2 from '../../Images/bg2.jpg';
import bg3 from '../../Images/bg3.jpg';
import bg4 from '../../Images/bg4.jpg';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div className="flex opacity-50 justify-center items-center h-screen">
      {/* Center the carousel on the page */}
      <Slider {...settings} className="w-3/4 h-auto">
        <div className="flex justify-center items-center">
          <img src={bg1} alt="Slide 1" className="w-full h-auto" />
        </div>
        <div className="flex justify-center items-center">
          <img src={bg2} alt="Slide 2" className="w-full h-auto" />
        </div>
        <div className="flex justify-center items-center">
          <img src={bg3} alt="Slide 3" className="w-full h-auto" />
        </div>
        <div className="flex justify-center items-center">
          <img src={bg4} alt="Slide 4" className="w-full h-auto" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
