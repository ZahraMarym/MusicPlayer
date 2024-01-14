import { useContext, useState } from "react";
import songContext from "../../contexts/songContext";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { Howl } from "howler";
const SingleSongCard = ({ info, playSound }) => {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
    const [currentIcon, setCurrentIcon] = useState("gravity-ui:play");

    useEffect(() => {
      // Update the icon based on the play/pause state for the current song
      if (currentSong === info) {
        if (isPaused) {
          setCurrentIcon("gravity-ui:play");
        } else {
          setCurrentIcon("gravity-ui:pause");
        }
      } else {
        // If a different song is clicked, set the icon to initial pause state
        setCurrentIcon("gravity-ui:play");
      }
    }, [currentSong, isPaused, info]);
//icon

//nextSong


  // Icon click handler
  const handleIconClick = () => {
    if (currentSong === info) {
      // If the clicked song is the current song, toggle play/pause
      togglePlayPause();
    } else {
      // If a different song is clicked, play that song
      setCurrentSong(info);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (soundPlayed) {
      if (isPaused) {
        // If paused, play the sound
        soundPlayed.play();
      } else {
        // If playing, pause the sound
        soundPlayed.pause();
      }
      setIsPaused(!isPaused); // Toggle play/pause state
    }
  };

  return (
    <div
      className={`flex border ${
        currentSong === info
          ? "border-blue-800 bg-black bg-opacity-30"
          : "border-gray-900"
      } hover:border-blue-800 hover:bg-black hover:bg-opacity-30 p-2 rounded-sm`}
      onClick={() => {
        handleIconClick();
      }}
    >
      <div
        className="w-12 h-12 bg-cover bg-center"
        style={{
          backgroundImage: `url(${info.thumbnail})`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-blue-600 flex flex-col justify-center pl-4 md:w-5/6">
          <div className="cursor-pointer hover:underline">{info.name}</div>
          <div className="text-xs text-gray-400 cursor-pointer hover:underline">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
        <div className="w-1/6 md:justify-center md:flex md:items-center text-gray-400 text-sm text-opacity-30">
          <div>
            <Icon
              icon={ currentIcon}
              width="20"
              className="cursor-pointer hover:text-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleSongCard;
