import {createContext} from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: () => {},
    songData: [],  
    setSongData: () => {},  // Add a setter for songList
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: false,
    setIsPaused: () => {},
    currentSongIndex: null,
    setCurrentSongIndex: () =>{},
  });
  


export default songContext;