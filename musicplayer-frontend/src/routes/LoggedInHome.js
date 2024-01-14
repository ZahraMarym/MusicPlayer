import { useEffect } from "react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper"
import { useNavigate } from "react-router-dom";
import SingleSongCard from "../components/shared/SingleSongCard";

const LoggedInHome = () => {

  //song
  const [songData, setSongData] = useState([]);
  useEffect(()=>{
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
      console.log(response);
      setSongData(response);
    };
    getData();
  },[]);

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
        <div className="text-white text-xl pt-8 font-semibold">Your PlayLists</div>
      <div className="w-full py-5 grid gap-5 grid-cols-5">
      {playList.map((item) => {
                    return (
                        <Card
                            key={JSON.stringify(item)}
                            title={item.name}
                            description=""
                            imgUrl={item.thumbnail}
                            playlistId={item._id}
                        />
                    );
                })}
                </div>
          <div className="w-full text-white text-xl pt-8 font-semibold">
            Your Songs
          </div>
         {songData.map((item) => (
          <SingleSongCard key={item.id} info={item} playSound={()=>{}}/>
        ))}
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl , playlistId}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-black bg-opacity-40 w-full p-4 rounded-lg"
    onClick={() => {
      navigate("/playlist/" + playlistId);
      console.log("")
  }}>
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};


export default LoggedInHome;
