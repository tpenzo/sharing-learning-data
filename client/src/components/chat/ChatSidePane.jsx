import React from "react";
import { useSelector } from "react-redux";
import { showCode, showImageChat, showNameChat } from "../../utils/handleChat";

function ChatSidePane() {

  const { chat, auth } = useSelector(state => state)
  const { selectedChat } = chat

  return (
    <div className="flex flex-col justify-center p-3">
      <div className="font-semibold text-base mb-4 pl-2 text-center">
        <p className="">{showCode(selectedChat, auth.user._id)}</p>
        <p className="uppercase font-semibold">{showNameChat(selectedChat, auth.user._id)}</p>
      </div>
      <figure className="flex justify-center">
        <img
          src={showImageChat(selectedChat, auth.user._id)}
          className="object-cover rounded-xl h-53 w-53"
          alt=""
        />
      </figure>
      {/* <div className="font-semibold py-4">Ngày tạo 22/03/2023</div> */}
      <div className="mt-5">
        {/* <span className="font-medium text-sm">Mô tả</span> */}
        <p className="text-gray-600 font-light text-xs px-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eaque! Laborum cupiditate aut nulla nisi placeat nobis ex, omnis quas asperiores suscipit cumque esse neque inventore alias, voluptate eius tenetur.</p>
      </div>
    </div>
  );
}

export default ChatSidePane;
