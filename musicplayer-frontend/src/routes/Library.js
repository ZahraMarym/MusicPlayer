import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import {useNavigate} from "react-router-dom";

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"Library"}>
    {/* Heading for My Playlists */}
    <div className="text-white text-2xl font-semibold pt-8 pb-4">My Playlists</div>
  
    {/* Grid layout for playlists */}
    <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Mapping through myPlaylists to render each playlist */}
      {myPlaylists.map((item) => (
        <Card
          key={item._id}  
          title={item.name}
          description="" 
          imgUrl={item.thumbnail}
          playlistId={item._id}
        />
      ))}
    </div>
  </LoggedInContainer>
  
  );
};

const Card = ({ title, description, imgUrl , playlistId}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-black bg-opacity-40 w-full p-4 rounded-lg items-center flex flex-row justify-center"
    onClick={() => {
      navigate("/playlist/" + playlistId);
      console.log("")
  }}>
      <div className="pb-4 pt-2">
        <img className="h-1/4 rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3  ml-3">{title}</div>
    </div>
  );
};

export default Library;
