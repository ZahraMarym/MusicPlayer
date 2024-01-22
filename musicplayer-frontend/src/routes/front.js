import Carousel from "../components/shared/Carosel";
import { useState } from "react";
import alan from "../Images/alan.jpg";
import arijit from "../Images/arijit.jpg";
import atif from "../Images/atif.jpg";
import daddyYankee from "../Images/daddyYakee.jpg";
import ImranKhan from "../Images/imranKhan.jpg";
import lovely from "../Images/lovely.jpg";
import ed from "../Images/ed.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import techno from "../Images/techno.jpg";
import electronic from "../Images/electronic.jpg";
import classic from "../Images/classic.jpg";
import pop from "../Images/pop.jpg";
import { Link } from "react-router-dom";
import rock from "../Images/rock.jpg";

import { useSpring, animated } from "react-spring";

import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
const Front = () => {
  const [isOpen, setIsOpen] = useState([]);

  //featured SOng Array
  const featuredSongs = [
    { title: "Lovely", artist: "Billie Ellish", thumbnail: alan },
    { title: "Bulleya", artist: "Arijit Singh", thumbnail: arijit },
    { title: "To Phir Ao", artist: "Atif Aslam", thumbnail: atif },
    { title: "Gasolina", artist: "Daddy Yankee", thumbnail: daddyYankee },
    { title: "Satisfya", artist: "Imran Khan", thumbnail: ImranKhan },
    { title: "Shape of You", artist: "Ed Sheeran", thumbnail: ed },
    // Add more songs as needed
  ];
  //latest release data
  const latestSongs = [
    { title: "Ignite", artist: "Alan Walker", thumbnail: lovely },
    { title: "Bulleya", artist: "Arijit Singh", thumbnail: arijit },
    { title: "To Phir Ao", artist: "Atif Aslam", thumbnail: atif },
    { title: "Gasolina", artist: "Daddy Yankee", thumbnail: daddyYankee },
    // Add more songs as needed
  ];

  const genres = [
    { name: "Pop", imageUrl: pop },
    { name: "Rock", imageUrl: rock },
    { name: "Hip Hop", imageUrl: techno },
    { name: "Electronic", imageUrl: electronic },
    { name: "Classical", imageUrl: classic },
    { name: "Techno", imageUrl: techno },
  ];

  //spring for fade in
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  //slider setting
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 3, // Set the number of slides to show at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
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
    <div className="w-screen h-screen bg-gray-900">
      {/* navbar */}
      <div className="">
        <nav className="bg-gray-900 border-b border-gray-300 opacity-90 p-4">
          <div className="container my-0 mx-auto flex justify-between items-center">
            <div className="text-blue-700 font-bold text-4xl">MusicPlayer</div>

            {/* Hamburger icon for mobile */}
            <div className="lg:hidden">
              <button className="text-white focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                ></svg>
              </button>
            </div>

            {/* Navigation links */}
            <div
              className={`lg:flex flex-grow items-center ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <ul className="flex items-center flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <a href="#about" className="px-4 py-2 text-white">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#contacts" className="px-4 py-2 text-white">
                    Contact
                  </a>
                </li>
                <li className="nav-item mr-3">
                  <Link to="/login">
                    <div className="border border-gray-600 p-2 transform transition duration-300 ease-in-out hover:scale-125 hover:shadow-lg">
                      <a href="#" className="px-4 py-2 text-white">
                        LOG IN
                      </a>
                    </div>
                  </Link>
                </li>
                <li className="nav-item mr-4">
                  <Link to="/signup">
                    <div className="border border-gray-600 p-2 transform transition duration-300 ease-in-out hover:scale-125 hover:shadow-lg">
                      <a href="#" className="px-4 py-2 text-white">
                        SIGN UP
                      </a>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* carousel */}
      <div className="bg-gray-900 text-white relative">
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
          <section className="w-11/12 mb-8 ml-9 bg-black text-center bg-opacity-20 border border-blue-700 pl-5">
            <h2 className="text-2xl font-bold text-blue-700 mt-5 mb-4">
              Featured Songs
            </h2>
            <Slider {...sliderSettings}>
              {featuredSongs.map((song, index) => (
                <div key={index} className="w-48 m-7 md:w-44 lg:w-56 xl:w-64">
                  <img
                    src={song.thumbnail}
                    alt={`Thumbnail for ${song.title}`}
                    className="w-3/4 h-48 object-cover rounded-md mb-2"
                  />
                  <div clasName="relative text-center flex flex-col lg:flex-row">
                    <h3 className="text-gray-200 text-center text-lg font-semibold mb-2">
                      {song.title}
                    </h3>
                    <p className="text-gray-400 text-center">{song.artist}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </section>

          {/* Latest Releases Section */}
          <section className="mb-8 text-center gradient-background p-8">
            <h2 className="text-3xl text-center text-blue-700 font-bold border-b border-gray-500 mb-6 pb-2 mx-auto w-1/3">
              Latest Release
            </h2>
            <div className="flex flex-wrap justify-center">
              {featuredSongs.map((song, index) => (
                <div
                  key={index}
                  className="song-card hover:bg-black hover:bg-opacity-40 mb-8 w-64 mx-4"
                >
                  <div className="border border-blue-900 p-6 rounded-lg shadow-md ransform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                    <img
                      src={song.thumbnail}
                      alt={`Thumbnail for ${song.title}`}
                      className="w-full h-40 object-cover rounded-md mb-4 w-48"
                    />
                    <h3 className="text-lg font-semibold mb-2 text-gray-300">
                      {song.title}
                    </h3>
                    <p className="text-gray-400">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Explore Genres Section */}
          <section className="mb-8 text-center items-center justify-center">
            <h2 className="text-3xl text-center text-blue-700 font-bold border-b border-gray-500 mb-6 pb-2 mx-auto w-1/3">
              Explore Genres
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {genres.map((genre, index) => (
                <div
                  key={index}
                  className="border border-gray-800 w-56 bg-gray-800 hover:bg-gray-900 rounded-md shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-125 hover:shadow-lg"
                >
                  <img
                    src={genre.imageUrl} // Replace with actual image URLs
                    alt={`Genre: ${genre.name}`}
                    className="w-5/6 h-40 object-cover m-5 mb-2"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{genre.name}</h3>
                    <button className="bg-blue-900 text-white py-2 px-4 rounded-full border border-blue-900 hover:bg-gray-900 focus:outline-none focus:shadow-outline-blue active:bg-gray-900">
                      Explore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* about section */}
      <section className="py-12 bg-gray-900 text-gray-400">
        <div id="about" className="container w-2/3  mx-auto text-center">
          <h2 className="text-3xl text-center text-blue-700 font-bold border-b border-gray-500 mb-6 pb-2 mx-auto w-1/3">
            About Us
          </h2>
          <p className="text-md mb-8">
            Welcome to Music Player, where music comes to life in a whole new
            way. We believe that music is not just a sound; it's an experience,
            a journey, and a source of endless inspiration.
          </p>

          <h3 className="text-xl font-bold mb-4">What Sets Us Apart?</h3>
          <p className="text-md mb-8">
            At Music Player, we are more than just a music player. We're your
            companion in the world of melodies, bringing you a range of features
            designed to elevate your listening experience.
          </p>

          {/* Add other sections as needed */}

          <h3 className="text-xl font-bold mb-4">Join the Community</h3>
          <p className="text-md mb-8">
            Music Player is more than a player; it's a community of music
            lovers. Connect with fellow enthusiasts, share your favorite
            playlists, and discover new tracks that resonate with your soul.
          </p>

          <h3 className="text-xl font-bold mb-4">Future Sounds</h3>
          <p className="text-md mb-8">
            As we continue to grow, our commitment remains unwavering. We're
            constantly innovating and evolving to bring you the latest in music
            technology. Stay tuned for upcoming features and enhancements that
            will redefine the way you experience music.
          </p>

          <h3 className="text-xl font-bold mb-4">Start Your Musical Journey</h3>
          <p className="text-md mb-8">
            Ready to embark on a musical journey like never before? Join Music
            Player today, and let the notes carry you away.
          </p>
        </div>
      </section>
      {/* 
      footer */}

      <div id="contacts">
        <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 border border-t border-gray-400 gap-8 text-gray-300 bg-gray-900">
          <div>
            <h1 className="w-full text-3xl font-bold text-[#00df9a]">
              MusicPlayer
            </h1>
            <p className="py-4">
              Listen to your favourites songs and create playlist of your music.{" "}
            </p>
            <div className="flex justify-between md:w-[75%] my-6">
              <Link to="https://github.com/ZahraMarym">
                <FaGithubSquare size={30} />
              </Link>
              <Link to="https://www.facebook.com/profile.php?id=100072811640476">
                <FaFacebookSquare size={30} />
              </Link>
              <Link to="https://twitter.com/ZahraMa50274393">
                <FaTwitterSquare size={30} />
              </Link>
              <Link to="https://www.instagram.com/its_zahramarym115/">
                <FaInstagram size={30} />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-3 flex justify-between mt-6">
            <div>
              <h2 className="font-medium text-gray-400">Solutions</h2>
              <ul>
                <li className="py-2 text-sm">Analytics</li>
                <li className="py-2 text-sm">Marketing</li>
                <li className="py-2 text-sm">Commerce</li>
                <li className="py-2 text-sm">Insights</li>
              </ul>
            </div>
            <div>
              <h2 className="font-medium text-gray-400">Support</h2>
              <ul>
                <li className="py-2 text-sm">Pricing</li>
                <li className="py-2 text-sm">Documentation</li>
                <li className="py-2 text-sm">Guides</li>
                <li className="py-2 text-sm">API Status</li>
              </ul>
            </div>
            <div>
              <h2 className="font-medium text-gray-400">Company</h2>
              <ul>
                <li className="py-2 text-sm">About</li>
                <li className="py-2 text-sm">Blog</li>
                <li className="py-2 text-sm">Jobs</li>
                <li className="py-2 text-sm">Press</li>
                <li className="py-2 text-sm">Careers</li>
              </ul>
            </div>
            <div>
              <h2 className="font-medium text-gray-400">Legal</h2>
              <ul>
                <li className="py-2 text-sm">Claim</li>
                <li className="py-2 text-sm">Policy</li>
                <li className="py-2 text-sm">Terms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Front;
