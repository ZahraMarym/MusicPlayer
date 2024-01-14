import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bg1 from "../../Images/bg10.jpg";
import bg2 from "../../Images/bg2.jpg";
import bg3 from "../../Images/bg3.jpg";
import bg4 from "../../Images/bg4.jpg";
import { Link } from "react-router-dom";
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
  const carouselItems = [
    {
      image: bg1,
      text: "Discover Amazing Music",
    },
    {
      image: bg2,
      text: "Explore Diverse Genres",
    },
    {
      image: bg3,
      text: "Create Your Playlists",
    },
    {
      image: bg4,
      text: "Enjoy Your Favorite Songs",
    },
  ];

  return (
    <div className="relative w-full h-full bg-gray-900 items-center">
      {/* Center the carousel on the page */}
      <Slider {...settings} className="w-5/6 mx-auto">
        {carouselItems.map((item, index) => (
          <div key={index} className="relative h-full flex flex-col">
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto opacity-30"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h1 className="text-8xl font-bold opacity-50">{item.text}</h1>
              <div className="flex items-center justify-center">
                <Link to="/login">
                <div className="w-64 border hover:bg-transparent cursor-pointer bg-black bg-opacity-40 border-blue-900 text-xl p-5">
                Get Started
                </div>
                </Link>
              </div>{" "}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
