import Carousel from "../components/shared/Carosel";
import { useState } from "react";
import alan from "../Images/alan.jpg";
import arijit from "../Images/arijit.jpg"
import atif from "../Images/atif.jpg"
import daddyYankee from "../Images/daddyYakee.jpg"
import ImranKhan from "../Images/imranKhan.jpg"
import ed from "../Images/ed.jpg"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Front = () => {
  const [isOpen, setIsOpen] = useState([]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  //featured SOng Array
  const featuredSongs = [
    { title: 'Ignite', artist: 'Alan Walker', thumbnail: alan },
    { title: 'Bulleya', artist: 'Arijit Singh', thumbnail: arijit },
    { title: 'To Phir Ao', artist: 'Atif Aslam', thumbnail: atif },
    { title: 'Gasolina', artist: 'Daddy Yankee', thumbnail: daddyYankee },
    { title: 'Satisfya', artist: 'Imran Khan', thumbnail: ImranKhan },
    { title: 'Shape of You', artist: 'Ed Sheeran', thumbnail: ed },
    // Add more songs as needed
  ];
  //slider setting
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, // Set the number of slides to show at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
          breakpoint: 768, // Adjust this breakpoint as needed
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480, // Adjust this breakpoint as needed
          settings: {
            slidesToShow: 1,
          },
        },
      ],
  };

  return (
    <div classNam="w-full h-full bg-gray-900">
      {/* navbar */}
      <div className="">
        <nav className="bg-black opacity-60 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white font-bold text-xl">Your Logo</div>

            {/* Hamburger icon for mobile */}
            <div className="lg:hidden">
              <button
                onClick={toggleNavbar}
                className="text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path d="M4 6h16M4 12h16m-7 6h7"></path>
                  )}
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <div
              className={`lg:flex flex-grow items-center ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <a href="#" className="px-4 py-2 text-white">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="px-4 py-2 text-white">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="px-4 py-2 text-white">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="px-4 py-2 text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* carousel */}
      <div className="bg-gray-900">
        <Carousel />
      </div>

      {/* content */}
      <div className="bg-gray-900 text-center">
        <div className="container mx-auto p-4">
          {/* Hero Section */}
          <section className="mb-8">
            <h1 className="text-4xl text-gray-100 font-bold mb-4">
              Discover Your Favorite Music
            </h1>
            <p className="text-gray-200">
              Explore a vast collection of songs and artists. Find the music
              that suits your mood.
            </p>
          </section>

          {/* Featured Songs Section */}
          <section className="w-full mb-8 bg-black text-center bg-opacity-20 border border-blue-700 pl-5">
      <h2 className="text-2xl font-bold text-blue-700 mt-5 mb-4">Featured Songs</h2>
      <Slider {...sliderSettings}>
        {featuredSongs.map((song, index) => (
          <div key={index} className="w-48 m-7 md:w-44 lg:w-56 xl:w-64">
            <img
              src={song.thumbnail}
              alt={`Thumbnail for ${song.title}`}
              className="w-3/4 h-48 object-cover rounded-md mb-2"
            />
            <div clasName="relative text-center flex flex-col lg:flex-row">
            <h3 className="text-gray-200 text-center text-lg font-semibold mb-2">{song.title}</h3>
            <p className="text-gray-400 text-center">{song.artist}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>

          {/* Latest Releases Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Latest Releases</h2>
            {/* Display latest releases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Release Card Component */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <img
                  src="album-cover-url.jpg"
                  alt="Album Cover"
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold mb-2">Album Title</h3>
                <p className="text-gray-600">Artist Name</p>
              </div>
              {/* Repeat similar cards for other latest releases */}
            </div>
          </section>

          {/* Explore Genres Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Explore Genres</h2>
            {/* Display genres with images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Genre Card Component */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <img
                  src="genre-image-url.jpg"
                  alt="Genre Image"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold mb-2">Genre Name</h3>
              </div>
              {/* Repeat similar cards for other genres */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Front;
