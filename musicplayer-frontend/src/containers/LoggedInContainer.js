import { useLayoutEffect } from "react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import { useContext } from "react";
import songContext from "../contexts/songContext";
import { useRef } from "react";
import CreatePlaylistModals from "../modals/CreatePlaylistModals";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(true);
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    // the following if statement will prevent the useEffect from running on the first render.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    var sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pausedSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pausedSound();
      setIsPaused(true);
    }
  };
  return (
    <div className="w-full h-full">
      {createPlaylistModalOpen && (
                <CreatePlaylistModals
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
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
                targetLink={"/home"}
                active={currentActiveScreen === "home"}
              />
              <IconTexts
                iconName={"material-symbols:search"}
                displayText={"Search"}
                targetLink={"/Search"}
                active={currentActiveScreen === "Search"}
              />
              <IconTexts
                iconName={"fluent:library-16-regular"}
                displayText={"Your Library"}
                targetLink={"/Library"}
                active={currentActiveScreen === "Library"}
              />
              <IconTexts
                iconName={"lets-icons:music-light"}
                displayText={"My Music"}
                targetLink={"/MyMusic"}
                active={currentActiveScreen === "MyMusic"}
              />
            </div>

            <div className="pt-5">
              <IconTexts
                iconName={"ph:plus-fill"}
                displayText={"Create Playlist"}
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
              }}
              />
              <IconTexts
                iconName={"lucide:heart"}
                displayText={"Liked Songs"}
                targetLink=""
                active={currentActiveScreen === "LikedSong"}
              />
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
          <div className="content p-5 pt-0 overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 rounded-md px-4 flex text-blue-700 items-center px-4 border-t border-blue-900">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="thumbnail"
              className="h-14 w-14 rounded-lg"
            />
            <div className="ml-3 hover:underline cursor-pointer">
              <div className="text-sm">{currentSong.name}</div>
              <div className="text-xs">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-2/4 flex flex-col justify-center items-center h-full">
            <div className="flex w-1/3 justify-between">
              <Icon
                icon="lucide:shuffle"
                width="23"
                className="cursor-pointer hover:text-gray-800"
              />
              <Icon
                icon="fluent:previous-20-filled"
                width="26"
                className="cursor-pointer hover:text-gray-800"
              />
              <Icon
                icon={isPaused ? "gravity-ui:play" : "gravity-ui:pause"}
                width="30"
                className="cursor-pointer hover:text-gray-800"
                onClick={togglePlayPause}
              />
              <Icon
                icon="teenyicons:next-solid"
                width="26"
                className="cursor-pointer hover:text-gray-800"
              />
              <Icon
                icon="ion:repeat-sharp"
                width="29"
                className="cursor-pointer hover:text-gray-800"
              />
            </div>
            <div></div>
          </div>
          <div className="w-1/4 flex justify-end">hello</div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
