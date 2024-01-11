import { useState } from "react";
import { Icon } from "@iconify/react";
import songContext from "../contexts/songContext";
import { useContext } from "react";

const VolumeModal = ({ closeModal }) => {
  const [volume, setVolume] = useState(50); // Initial volume percentage
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  //volume button
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    soundPlayed.volume(newVolume/100);
    setVolume(newVolume);
    soundPlayed.volume(newVolume/100); // Convert percentage to decimal
  };
  return (
    <div
      className="absolute bg-black w-48 h-16 flex bg-opacity-70 justify-end bottom-2 right-8"
      onClick={closeModal}
    >
      <div
        className="absolute bottom-5 flex bg-transparent text-gray-400 w-full rounded-md items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <Icon icon="uil:volume" className="mr-2 text-blue-900" width="30" />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleVolumeChange}
          onClick={closeModal}
          className="bg-gray-900 appearance-none h-3 w-full md:w-32 rounded-md overflow-hidden"
        />
      </div>
    </div>
  );
};
export default VolumeModal;
