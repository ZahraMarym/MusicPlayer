const SingleSongCard = ({info,playSound}) => {
  return (
    <div className="flex border border-gray-900  hover:border-blue-800 hover:bg-black hover:bg-opacity-30 p-2 rounded-sm" onClick={()=>{playSound(info.track)}}>
      <div
        className="w-12 h-12 bg-cover bg-center"
        style={{
          backgroundImage: `url(${info.thumbnail})`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-blue-600 flex flex-col justify-center pl-4 w-5/6">
          <div className="cursor-pointer hover:underline">{info.name}</div>
          <div className="text-xs text-gray-400 cursor-pointer hover:underline">{info.artist.firstName +" "+ info.artist.lastName}</div>
        </div>
        <div className="w-1/6 justify-center flex items-center text-gray-400 text-sm text-opacity-30">
          <div>3.44</div>
        </div>
      </div>
    </div>
  );
};
export default SingleSongCard;
