import { useEffect } from "react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import SingleSongCard from "../components/shared/SingleSongCard";

const LoggedInHome = () => {
  //song
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/allSongs");

        setSongData(response.data);
      } catch (error) {
        console.error('Error fetching all artists songs:', error.message);
      }
    };

    getData();
  }, []);


  //playlists
  const [artists, setArtists] = useState([]);
  const [playList, setPlayList] = useState([]);
  //fetching playLists
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setPlayList(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen="home">
      <div className="text-white text-xl pt-8 font-semibold">
        Your PlayLists
      </div>
      <div className="grid gap-4 cursor-pointer sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Mapping through myPlaylists to render each playlist */}
        {playList.map((item) => (
          <Card
            key={item._id}
            title={item.name}
            description=""
            imgUrl={item.thumbnail}
            playlistId={item._id}
          />
        ))}
      </div>
      <div className="w-full text-white text-xl pt-8 font-semibold">
        Your Songs
      </div>
      {Array.isArray(songData) &&
        songData.map((item) => (
          <SingleSongCard key={item.id} info={item} playSound={() => {}} />
        ))}
    </LoggedInContainer>
  );
};
const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-40 w-full p-4 rounded-lg items-center flex flex-row justify-center"
      onClick={() => {
        navigate("/playlist/" + playlistId);
        console.log("");
      }}
    >
      <div className="pb-4 pt-2">
        <img className="h-1/4 rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3  ml-3">{title}</div>
    </div>
  );
};

export default LoggedInHome;
