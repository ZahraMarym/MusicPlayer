import { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import { Link } from "react-router-dom";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { Howl, Howler } from "howler";
import LoggedInContainer from "../containers/LoggedInContainer";
import songContext from "../contexts/songContext";
    const MyMusic = () => {
      const [songData, setSongData] = useState([]);
      useEffect(()=>{
        const getData = async () => {
          const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
          console.log(response);
          setSongData(response);
        };
        getData();
      },[])
  return (
    <LoggedInContainer currentActiveScreen="MyMusic">
      <div className="text-blue-700 text-lg font-semibold py-4 px-2 md:pl-4">
        My Songs
      </div>
      <div className="space-y-3 overflow-auto">
        {songData.map((item) => (
          <SingleSongCard key={item.id} info={item} playSound={()=>{}}/>
        ))}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;


