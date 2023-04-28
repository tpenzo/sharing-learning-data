import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wrap, Avatar } from "@chakra-ui/react";

function PopularUserInfo(props) {
  const [chosen, setChosen] = useState(false);
  const { user, numPosts, numLikes } = props;

  const chooseItem = () => setChosen(!chosen);

  return (
    <Link to={`/profile/${user?._id}`}>
      <li
        title={user?.fullName}
        className="user-info flex flex-row justify-start items-center w-full py-2 px-3 list-none bg-inherit hover:bg-white hover:shadow-hover-button rounded-xl mt-1 mx-auto cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden"
      >
        {/* <div className="inline-block border-[1px] border-gray-300 rounded-[100%] mt-1 text-center ">
          <img className="w-8 h-8 rounded-full" src={user.urlAvatar} alt="Rounded avatar"/>
      </div> */}
        <Wrap>
          <Avatar size="md" src={user?.urlAvatar}></Avatar>
        </Wrap>
        <div className="max-w-[75%] ml-3">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap overflow-ellipsis overflow-hidden">
            {user?.fullName}
          </span>
          {numLikes && numPosts && (
            <div className="text-xs font-thin overflow-hidden">
              <p>Số bài viết: {numPosts}</p>
              <p>Số lượt tương tác: {numLikes}</p>
            </div>
          )}
        </div>
      </li>
    </Link>
  );
}

export default PopularUserInfo;
