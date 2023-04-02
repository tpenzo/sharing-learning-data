import { Avatar, Wrap } from "@chakra-ui/react";
import React from "react";
import moment from "moment";

function SenderMessage({ message }) {
  return (
    <>
      <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
          <div className="">
          <Wrap>
            <Avatar src={message?.sender.urlAvatar}></Avatar>
          </Wrap>
          </div>
          <div className="relative mr-3 text-sm bg-blue-100 py-2 px-4 shadow rounded-xl w-full">
            <div
            className="break-words"
            >{message?.content}</div>
            <p className="text-[9px] text-[#919191]" >
              {moment(message?.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SenderMessage;
