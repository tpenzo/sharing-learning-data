import React, { useState } from "react";

function PopularUserInfo() {
  const [userName, setUserName] = useState("Nguyễn Văn Abc");
  const [chosen, setChosen] = useState(false);

  const chooseItem = () => setChosen(!chosen);

  return (
    <li
    title={userName}
    className="user-info flex flex-row justify-start items-center w-full py-2 px-3 list-none bg-inherit hover:bg-white hover:shadow-sm rounded-xl mt-1 mx-auto cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden">
      <div className="max-w-[20%] w-8 h-8 2xl:w-10 2xl:h-10 inline-block border-[1px] border-gray-300 bg-gray-200 p-2 rounded-full mt-1 text-center">
        {/* {img ? img :<box-icon name='user' ></box-icon>} */}
      </div>
      <div className="max-w-[75%] ml-3">
        <span className="text-sm 2xl:text-base font-semibold text-gray-700 whitespace-nowrap overflow-ellipsis overflow-hidden">
          {userName}
        </span>
      </div>
    </li>
  );
}

export default PopularUserInfo;
