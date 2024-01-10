import { useEffect } from "react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import Textfield from "../components/shared/textfield";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import CloudinaryUplaodComponent from "../components/shared/CloudinaryUplaod";
import LoggedInContainer from "../containers/LoggedInContainer";

const UplaodSong = () => {
  console.log(window);
  console.log(window.cloudinary);
  useEffect(() => {
    document.body.classList.add("bg-gray-900");

    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, []);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate = useNavigate();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (response.err) {
      alert("Could not create song");
      return;
    }
    alert("Success");
    navigate("/home");
  };
  return (
   <LoggedInContainer currentActiveScreen={"/UploadSong"}>
          <div className="content p-5 pt-0 overflow-auto">
          <div className="text-2xl font-semibold mb-5 text-white mt-8">
            Upload Your Songs
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              <Textfield
                label={"Name"}
                labelClassName={"text-white"}
                placeholder={"Name"}
                value={name}
                setValue={setName}
                className={"text-blue-700"}
              />
            </div>
            <div className="w-1/2">
              <Textfield
                label={"Thumbnail"}
                labelClassName={"text-white"}
                placeholder={"Thumbnail"}
                value={thumbnail}
                setValue={setThumbnail}
                className={"text-blue-700"}
              />
            </div>
          </div>
          <div className="py-5">
            {uploadedSongFileName ? (
              <div className="bg-transparent border border-blue-700 text-white rounded-full p-3 w-1/3">
                <IconTexts
                  iconName={"akar-icons:play"}
                  displayText={uploadedSongFileName.substring(0, 35)}
                />
              </div>
            ) : (
              <CloudinaryUplaodComponent
                setUrl={setPlaylistUrl}
                setName={setUploadedSongFileName}
              />
            )}
          </div>
          <div
            className="bg-blue-700 text-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
            onClick={submitSong}
          >
            Submit Song
          </div>
        </div>
   </LoggedInContainer>
  );
};

export default UplaodSong;
