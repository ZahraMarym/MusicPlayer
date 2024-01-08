import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const IconTexts = ({iconName, displayText, active, targetLink}) => {
  return (
    <Link to={targetLink} className="block">
  <div className="flex items-center justify-start cursor-pointer">
    <div className="px-5 py-2">
        <Icon icon={iconName} color={active? "#1c3db6":"#B4B5B7"} fontSize={27}/>
    </div>
    <div className={`text-${active?"blue-900":"gray-400"} text-sm font-semibold hover:text-blue-900`}>
        {displayText}
    </div>
    
  </div>
  </Link>
  )
};
export default IconTexts;
