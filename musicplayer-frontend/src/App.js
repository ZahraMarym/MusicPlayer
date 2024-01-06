import "./App.css";
import "./output.css";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/home";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import UplaodSongComponent from "./routes/UplaodSong";
function App() {
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="bg-gray-900 w-screen h-screen font-philosopher">
      <BrowserRouter>
        {cookie.token ? (
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/home" element={<LoggedInHomeComponent />} />
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/uplaodSongs" element={<UplaodSongComponent />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
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
