import { useEffect } from "react";
import { Icon } from "@iconify/react";
import IconTexts from "../components/shared/IconTexts";
import HoverText from "../components/shared/hoverText";
import { Link } from "react-router-dom";


const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const spotifyPlaylistsCardData = [
  {
    title: "This is one",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const LoggedInHome = () => {
  useEffect(() => {
    document.body.classList.add("bg-gray-900");

    return () => {
      document.body.classList.remove("bg-gray-900");
    };
  }, []);

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
            <Link to="/uplaodSongs"><HoverText displayText={"Upload Songs"} /></Link>
              <div className="bg-blue-700 text-blue-50 cursor-pointer h-10 w-10 px-2 rounded-full font-semibold flex items-center justify-center hover:bg-transparent border border-blue-700 font-semibold">
                ZM
              </div>
            </div>
          </div>
        </div>
        <div className="content p-5 pt-0 overflow-auto">
          <PlaylistView titleText="Focus" cardsData={focusCardsData} />
          <PlaylistView
            titleText="Spotify Playlists"
            cardsData={spotifyPlaylistsCardData}
          />
          <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {
          // cardsData will be an array
          cardsData.map((item) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            );
          })
        }
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default LoggedInHome;
