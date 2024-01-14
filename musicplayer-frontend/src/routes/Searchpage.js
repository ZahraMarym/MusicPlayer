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
    try {
      // This function will call the search API
      const response = await makeAuthenticatedGETRequest(
        "/song/get/songname/" + searchText
      );
  
      // Check if the response contains data
      if (response.data) {
        setSongData(response.data);
      } else {
        // Handle the case when the response does not contain data
        console.error("No data found for the given search.");
        // Optionally, you can set an empty array or do something else.
        setSongData([]);
      }
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
      console.error("Error occurred during search:", error.message);
      // Optionally, you can set an empty array or do something else.
      setSongData([]);
    }
  };

  return (
    <LoggedInContainer currentActiveScreen="search">
      <div className="w-full py-6">
        <div
          className={`w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-3 text-sm rounded-full bg-black bg-opacity-30 px-5 flex text-gray-300 space-x-3 items-center ${
            isInputFocused ? "border border-blue-900" : ""
          }`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          </div>
        ) : (
          <div className="text-gray-400 pt-10">Nothing to show here.</div>
        )}
      </div>
    </LoggedInContainer>
  );
};
export default SearchComponent;
