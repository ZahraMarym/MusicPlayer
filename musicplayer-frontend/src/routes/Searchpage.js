import { Icon } from "@iconify/react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";
const SearchComponent = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);

    const searchSong = async () => {
        // This function will call the search api
        const response = await makeAuthenticatedGETRequest(
            "/song/get/songname/" + searchText
        );
        setSongData(response.data);
    };

  return (
    <LoggedInContainer currentActiveScreen="search">
      <div className="w-full py-6">
        <div
          className={`w-1/3 p-3 text-sm rounded-full bg-black bg-opacity-30 px-5 flex text-gray-300 space-x-3 items-center
                     ${isInputFocused ? "border border-blue-900" : ""}`}
        >
          <Icon icon="ic:outline-search" className="text-lg text-blue-900" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-transparent text-gray-300 focus:outline-none"
            onFocus={() => {
                setIsInputFocused(true);
            }}
            onBlur={() => {
                setIsInputFocused(false);
            }}
            value={searchText}
            onChange={(e) => {
                setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    searchSong();
                }
            }}
          />
        </div>
        {songData.length > 0 ? (
                    <div className="pt-10 space-y-3">
                        <div className="text-white">
                            Showing search results for
                            <span className="font-bold"> {searchText}</span>
                        </div>
                        {songData.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-gray-400 pt-10">
                        Nothing to show here.
                    </div>
                )}
      </div>
    </LoggedInContainer>
  );
};
export default SearchComponent;
