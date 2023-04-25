import React from "react";
import { useSelector } from "react-redux";
import { showCode, showImageChat, showNameChat } from "../../utils/handleChat";
import { Wrap, Avatar, Square } from "@chakra-ui/react";

function ChatSidePane() {

  const { chat, auth } = useSelector(state => state)
  const { selectedChat } = chat

  return (
    <div className="flex flex-col justify-center p-3">
      <div className="font-semibold text-base mb-4 pl-2 text-center">
        <p className="">{showCode(selectedChat, auth.user._id)}</p>
        <p className="uppercase font-semibold">{showNameChat(selectedChat, auth.user._id)}</p>
      </div>
     <div className="flex justify-center">
     <Wrap>
      <Avatar size="2xl" src={showImageChat(selectedChat, auth.user._id)}></Avatar>
     </Wrap>
     </div>
      {/* <div className="font-semibold py-4">Ngày tạo 22/03/2023</div> */}
      <div className="mt-5">
        {/* <span className="font-medium text-sm">Mô tả</span> */}
        {/* <p className="text-gray-600 font-light text-xs px-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eaque! Laborum cupiditate aut nulla nisi placeat nobis ex, omnis quas asperiores suscipit cumque esse neque inventore alias, voluptate eius tenetur.</p>
       */}
      </div>
    </div>
  );
}

export default ChatSidePane;
