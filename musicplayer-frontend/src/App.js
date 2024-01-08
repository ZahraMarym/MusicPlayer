import "./App.css";
import "./output.css";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/home";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import UplaodSongComponent from "./routes/UplaodSong";
import MyMusicComponent from "./routes/MyMusics";
import songContext from "./contexts/songContext";
import { useState } from "react";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [cookie, setCookie] = useCookies(["token"]);
  const [isPaused, setIsPaused] = useState(true);
  const [soundPlayed, setSoundPlayed] = useState(null);

  return (
    <div className="bg-gray-900 w-screen h-screen font-philosopher">
      <BrowserRouter>
        {cookie.token ? (
           <songContext.Provider
           value={{
               currentSong,
               setCurrentSong,
               soundPlayed,
               setSoundPlayed,
               isPaused,
               setIsPaused,
           }}
       >
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/home" element={<LoggedInHomeComponent />} />
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/uplaodSongs" element={<UplaodSongComponent />} />
            <Route path="/MyMusic" element={<MyMusicComponent />} />
          </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
