const hoverText = ({ displayText, active}) => {
  return (
  <div className="flex items-center justify-start cursor-pointer text-lg">
    <div className={`text-${active?"blue-900":"gray-400"} font-semibold hover:text-blue-900`}>
        {displayText}
    </div>
    
  </div>
  )
};
export default hoverText;
