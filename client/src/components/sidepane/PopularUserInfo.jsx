import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wrap, Avatar } from "@chakra-ui/react";

function PopularUserInfo(props) {
  const [userName, setUserName] = useState("Nguyễn Văn Abcaaaaaaaaaaaaaaaaaaaaaa");
  const [chosen, setChosen] = useState(false);
  const {user} = props

  const chooseItem = () => setChosen(!chosen);

  return (
    <Link to={`/profile/${user._id}`}>
    <li
    title={user?.fullName}
    className="user-info flex flex-row justify-start items-center w-full py-2 px-3 list-none bg-inherit hover:bg-white hover:shadow-hover-button rounded-xl mt-1 mx-auto cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden">
      <div className="inline-block border-[1px] border-gray-300 rounded-[100%] mt-1 text-center ">
          <img className="w-8 h-8 rounded-full object-cover" src={user.urlAvatar} alt="Rounded avatar"/>
      </div>
      <div className="max-w-[75%] ml-3">
        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap overflow-ellipsis overflow-hidden">
          {user?.fullName}
        </span>
      </div>
    </li>
    </Link>
  );
}

export default PopularUserInfo;
