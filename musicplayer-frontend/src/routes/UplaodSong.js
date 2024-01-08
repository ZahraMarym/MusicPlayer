import { useEffect } from "react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import Textfield from "../components/shared/textfield";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import CloudinaryUplaodComponent from "../components/shared/CloudinaryUplaod";

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
              <HoverText displayText={"Upload Songs"} active/>
              <div className="bg-blue-700 text-blue-50 cursor-pointer h-10 w-10 px-2 rounded-full font-semibold flex items-center justify-center hover:bg-transparent border border-blue-700 font-semibold">
                ZM
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default UplaodSong;
