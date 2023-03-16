import { Avatar, Wrap } from "@chakra-ui/react";
import React from "react";
import moment from 'moment';

function ReceivedMessage({ message }) {
  return (
    <>
      <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-center">
          <Wrap>
            <Avatar src={message?.sender.urlAvatar} />
          </Wrap>
          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
            <div>
              {message?.content}
            </div>
            <p className="text-[9px] text-[#919191]" >
              { moment(message?.createdAt).fromNow() }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReceivedMessage;
