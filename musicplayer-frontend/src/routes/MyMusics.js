import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import { Link } from "react-router-dom";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { Howl, Howler } from "howler";
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
      setSongData(response);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen="MyMusic">
      <div className="text-blue-700 text-lg font-semibold pb-4 pt-8 pl-2">
        My Songs
      </div>
      <div className="space-y-3 overflow-auto">
        {songData.map((item) => (
          <SingleSongCard key={item.id} info={item} playSound={()=>{}} />
        ))}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;
