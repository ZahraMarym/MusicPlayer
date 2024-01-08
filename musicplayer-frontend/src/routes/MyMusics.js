import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import { Link } from "react-router-dom";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import {Howl,Howler} from "howler";
const MyMusic = () => {

  const [songData, setSongData] = useState([]);
  const [soundPlayed,serSountPlayed] = useState(null);

  const playSound=(songSrc)=>{
    if(soundPlayed){
      soundPlayed.stop();
    }
    var sound = new Howl({
      src: [songSrc]
    });
    serSountPlayed(sound);
    sound.play();
    console.log(soundPlayed);
  }

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
      console.log(response)
      setSongData(response);
    };
    getData(); 
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="h-full w-1/5 bg-black bg-opacity-40 flex flex-col justify-between pb-10">
        <div>
          <div className="logoDiv p-5">
            <Icon
              icon="arcticons:simplemusicplayer"
              color="#1c3db6"
              width="85"
            />
          </div>
          <div className="py-5">
            <IconTexts
              iconName={"material-symbols-light:home"}
              displayText={"Home"}
            />
            <IconTexts
              iconName={"material-symbols:search"}
              displayText={"Search"}
              active
            />
            <IconTexts
              iconName={"fluent:library-16-regular"}
              displayText={"Your Library"}
            />
            <IconTexts
              iconName={"lets-icons:music-light"}
              displayText={"My Music"}
              active
            />
          </div>

          <div className="pt-5">
            <IconTexts
              iconName={"ph:plus-fill"}
              displayText={"Create Playlist"}
            />
            <IconTexts iconName={"lucide:heart"} displayText={"Liked Songs"} />
          </div>
        </div>
        <div className="px-5">
          <div className="border border-blue-900 w-2/5 text-white flex px-2 py-1 rounded-full items-center justify-center cursor-pointer hover:border-white">
            <Icon icon="material-symbols-light:globe" color="white" />
            <div className="ml-2 text-sm font-semibold">English</div>
          </div>
        </div>
      </div>
      <div className="h-full w-4/5 overflow-auto">
        <div className="navbar w-full flex h-1/10 bg-black text-white bg-opacity-20 items-center justify-end">
          <div className="w-1/2 h-full flex ">
            <div className="w-2/3 flex justify-around items-center">
              <HoverText displayText={"Premium"} />
              <HoverText displayText={"Support"} />
              <HoverText displayText={"Download"} />
              <div className="h-1/2 border-r border-gray-400"></div>
            </div>
            <div className="w-1/3 flex justify-around h-full items-center">
              <Link to="/uplaodSongs">
                <HoverText displayText={"Upload Songs"} />
              </Link>
              <div className="bg-blue-700 text-blue-50 cursor-pointer h-10 w-10 px-2 rounded-full font-semibold flex items-center justify-center hover:bg-transparent border border-blue-700 font-semibold">
                ZM
              </div>
            </div>
          </div>
        </div>
        <div className="content p-5 pt-0 overflow-auto">
          <div className="text-blue-700 text-lg font-semibold pb-4 pl-2">
            My Songs
          </div>
          <div className="space-y-3 overflow-auto">
            {songData.map((item) => (
                <SingleSongCard
                key={item.id}
                info={item}
                playSound={playSound}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyMusic;
