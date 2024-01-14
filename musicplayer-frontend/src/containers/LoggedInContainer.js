import { useLayoutEffect } from "react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import { useContext } from "react";
import songContext from "../contexts/songContext";
import { useRef } from "react";
import CreatePlaylistModals from "../modals/CreatePlaylistModals";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { useCookies } from "react-cookie";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  //formating time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(0);
  const [volume, setVolume] = useState(50); // Initial volume percentage
  const [isLiked, setIsLiked] = useState(false);
  const [songList, setSongList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cookies, setCookie] = useCookies(["token"]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // Initial playback speed.

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  const firstUpdate = useRef(true);
  //color change
  useEffect(() => {
    document.body.classList.add("bg-black");

    return () => {
      document.body.classList.remove("bg-black");
    };
  }, []);

  //fetching songs
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mySongs");
      setSongList(response);
    };
    getData();
  }, []);

  //previous song
  const playPreviousSong = () => {
    setPlaybackSpeed(1);
    const newIndex = getCurrentSongIndex() - 1;
    if (currentIndex < songList.length > 0) {
      setCurrentIndex(newIndex);
      const nextSong = songList[newIndex];

      if (nextSong) {
        setCurrentSong(nextSong);
        changeSong(nextSong.track, newIndex);
      }
    } else {
      const newIndex = songList.length - 1;
      const nextSong = songList[newIndex];
      setCurrentIndex(newIndex);
      changeSong(nextSong.track, newIndex);
      setCurrentSong(nextSong);
    }
  };

  //nextSong
  const playNextSong = () => {
    setPlaybackSpeed(1);
    const newIndex = getCurrentSongIndex() + 1;
    if (currentIndex < songList.length - 1) {
      setCurrentIndex(newIndex);
      const nextSong = songList[newIndex];

      if (nextSong) {
        setCurrentSong(nextSong);
        changeSong(nextSong.track, newIndex);
      }
    } else {
      const newIndex = 0;
      const nextSong = songList[newIndex];
      setCurrentIndex(newIndex);
      changeSong(nextSong.track, newIndex);
      setCurrentSong(nextSong);
    }
  };

  //repeat song
  const repeat = () => {
    console.log("repeat");
    setIsPaused(false);
    setCurrentIndex(getCurrentSongIndex() - 2);
    changeSong(currentSong.track, currentIndex);
  };

  //currentSongIndex
  const getCurrentSongIndex = () => {
    if (currentSong) {
      // Find the index of the current song in the songList array
      setCurrentIndex(
        songList.findIndex((song) => song._id === currentSong._id)
      );

      // If the song is found, return its index
      if (currentIndex !== -1) {
        return currentIndex;
      }
    }
  };

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

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  useEffect(() => {
    if (soundPlayed) {
      soundPlayed.on("load", () => {
        setDuration(soundPlayed.duration());
        setTimer(0);

        // Start a timer to update the progress every second
        const intervalId = setInterval(() => {
          if (!isPaused && soundPlayed.playing()) {
            setTimer((prevTimer) => prevTimer + 1);
          }
        }, 1000);
        soundPlayed.on("end", () => {
          setTimer(0);
          setIsPaused(true);
        });

        return () => {
          clearInterval(intervalId);
        };
      });
    }
  }, [soundPlayed, isPaused, setIsPaused]);

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc, index) => {
    setPlaybackSpeed(1);
    if (soundPlayed) {
      soundPlayed.stop();
    }
    var sound = new Howl({
      src: [songSrc],
      html5: true,
      rate: playbackSpeed,
    });
    sound.on("end", () => {
      playNextSong();
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
    index = getCurrentSongIndex();
  };

  const pausedSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else if (duration === timer) {
      setIsPaused(true);
    } else {
      pausedSound();
      setIsPaused(true);
    }
  };

  //progress bar
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    soundPlayed.seek(newTime);
  };
  // progress bar
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    if (soundPlayed) {
      // Update the duration when the sound is loaded
      soundPlayed.on("load", () => {
        setDuration(soundPlayed.duration());
      });

      // Update the current time during playback
      soundPlayed.on("play", () => {
        const updateCurrentTime = () => {
          setCurrentTime(soundPlayed.seek());
          if (soundPlayed.playing()) {
            requestAnimationFrame(updateCurrentTime);
          }
        };

        updateCurrentTime();
      });

      // Clear current time when the sound is paused or stopped
      soundPlayed.on("pause", () => {
        setCurrentTime(0);
      });

      soundPlayed.on("stop", () => {
        setCurrentTime(0);
      });

      // Clear event listeners on component unmount
      return () => {
        soundPlayed.off("load");
        soundPlayed.off("play");
        soundPlayed.off("pause");
        soundPlayed.off("stop");
      };
    }
  }, [soundPlayed]);

  const handleDownload = () => {
    // Check if a song URL is available
    if (!currentSong) {
      alert("Select a song to Download");
    } else {
      const downloadLink = document.createElement("a");
      downloadLink.href = currentSong.track;
      downloadLink.download = currentSong.track; // Provide a custom filename
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
    }
  };

  //volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    soundPlayed.volume(newVolume / 100);
    setVolume(newVolume);
    soundPlayed.volume(newVolume / 100); // Convert percentage to decimal
  };

  //progress bar change event
  const handleProgressBarClick = (e) => {
    const progressBar = e.target;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const percentClicked = (clickPosition / progressBar.clientWidth) * 100;
    const newTime = (percentClicked / 100) * duration;
    setCurrentTime(newTime);
    soundPlayed.seek(newTime);
    setTimer(newTime);
  };
  //log out
  const logOut = () => {
    if(currentSong){
      pausedSound();
    }
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  // fastForward
  const fastForward = () => {
    console.log("forward" + playbackSpeed);
    setPlaybackSpeed(playbackSpeed + 0.25);
    soundPlayed.rate(playbackSpeed);
  };
  //rewind
  const rewind = () => {
    console.log("rewind" + playbackSpeed);
    setPlaybackSpeed(playbackSpeed - 0.25);
    if (playbackSpeed <= 0) {
      setPlaybackSpeed(0);
    }
    soundPlayed.rate(playbackSpeed);
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
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className={`flex ${currentSong ? 'flex-col lg:flex-row lg:h-9/10 ' : 'flex-row h-full'}`}>
        <div className="lg:w-1/5 w-full bg-black bg-opacity-40 flex flex-col justify-between pb-10">
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
                iconName={"iconoir:upload-data-window"}
                displayText={"Uplaod Songs"}
                targetLink={"/uplaodSongs"}
                active={currentActiveScreen === "UplaodSong"}
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
        <div className="lg:w-4/5 overflow-auto">
          <div className="navbar w-full flex lg:h-1/10 h-1/5 bg-black text-white bg-opacity-30 items-center justify-end">
            <div className="w-full lg:w-full xl:w-1/3 h-full flex lg:flex-col flex-wrap justify-between items-center">
              <div className="w-full lg:w-auto mb-2 mt-2 lg:mb-0 flex justify-center lg:justify-end items-center">
                <div className="mr-5 border-b border-gray-500 pb-2">
                  <HoverText
                    displayText={"Download"}
                    onClick={handleDownload}
                  />
                </div>
                <div className="border border-gray-500 p-2 mr-3">
                <HoverText
                    displayText={"LogOut"}
                    onClick={logOut}
                  />
                </div>
                <div className="bg-blue-700 ml-5 text-blue-50 cursor-pointer h-10 w-10 px-2 rounded-full font-semibold flex items-center justify-center hover:bg-transparent border border-blue-700 font-semibold ml-2">
                  <Icon icon="ph:user" />
                </div>
              </div>
            </div>
          </div>
          <div className="content p-5 pt-0 overflow-auto">{children}</div>
        </div>
      </div>

      {/* progress bar */}

      {currentSong && (
        <div className="w-full h-1/10 lg:h-1/7 bg-black bg-opacity-30 lg:rounded-md px-4 flex flex-col lg:flex-row text-blue-700 items-center px-4 border-t border-blue-900">
          <div className="w-full lg:w-1/4 flex items-center flex-row">
            <img
              src={currentSong.thumbnail}
              alt="thumbnail"
              className="h-14 w-14 opacity-0 lg:opacity-100 rounded-lg"
            />
            <div className="ml-3 hover:underline cursor-pointer opacity-0 lg:opacity-100">
              <div className="text-sm">{currentSong.name}</div>
              <div className="text-xs">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/4 flex flex-col justify-center items-center h-full">
            <div className="flex w-full lg:w-2/3 justify-between">
            <Icon
                icon="fluent:rewind-24-regular"
                width="23"
                className="cursor-pointer hover:text-gray-800 w-96 lg:w-26"
                onClick={rewind}
              />
              <Icon
                icon="fluent:previous-20-filled"
                width="26"
                className="cursor-pointer hover:text-gray-800 w-96 lg:w-26"
                onClick={playPreviousSong}
              />
              <Icon
                icon={isPaused ? "gravity-ui:play" : "gravity-ui:pause"}
                width="30"
                className="cursor-pointer hover:text-gray-800 w-96 lg:w-26"
                onClick={togglePlayPause}
              />
              <Icon
                icon="teenyicons:next-solid"
                width="26"
                className="cursor-pointer hover:text-gray-800 w-96 lg:w-26"
                onClick={playNextSong}
              />
              <Icon
                icon="formkit:fastforward"
                width="26"
                className="cursor-pointer hover:text-gray-800 w-96 lg:w-26"
                onClick={fastForward}
              />
            </div>
            <div>
              <div className="flex w-full justify-center">
                <div className="flex justify-between">
                  <div className="mx-3 opacity-0 lg:opacity-100">{formatTime(timer)}</div>
                  <div>
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      value={timer}
                      onChange={handleSeek}
                      onMouseDown={handleProgressBarClick}
                      className="bg-gray-900 appearance-none h-2 w-80 lg:w-96 text-black rounded-md overflow-hidden cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #4a5568 ${
                          (timer / duration) * 100
                        }%, #1a202c 0%)`,
                      }}
                    />
                  </div>
                  <div className="mx-3 opacity-0 lg:opacity-100">{formatTime(duration)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <div className="flex justify-center items-center">
              <Icon
                icon="uil:volume"
                className="mr-2 text-blue-900"
                width="30"
              />
               <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleVolumeChange}
          className="bg-gray-900 appearance-none h-3 w-full md:w-32 rounded-md overflow-hidden"
        />
            </div>
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />
            <Icon
              icon="ion:repeat-sharp"
              width="29"
              className="cursor-pointer hover:text-gray-800"
              onClick={repeat}
            />
            <Icon
              icon={isLiked ? "ri:heart-fill" : "ph:heart-bold"}
              fontSize={25}
              className="cursor-pointer text-red-800 hover:text-white"
              onClick={()=>{
                if(isLiked)
                setIsLiked(false);
            else{
              setIsLiked(true);
            }}
          }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
