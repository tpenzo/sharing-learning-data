import React, { useRef, useEffect } from "react";
import Header from "../components/header/Header";
import SenderMessage from "../components/chat/SenderMessage";
import ReceivedMessage from "../components/chat/ReceivedMessage";
import ChatSidePane from "../components/chat/ChatSidePane";
import ChatParticipant from "../components/chat/ChatParticipant";

export default function ChatPage() {
const bottomAnchor = useRef();

const scrollToBottom = () => {
    bottomAnchor.current?.scrollIntoView({ behavior: "smooth" })
  }

  //while messages list change, scroll to bottom 
//   useEffect(() => {
//     scrollToBottom()
//   }, [messages]);
useEffect(() => {
    scrollToBottom()
  }, []);

  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] max-h-full rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[90%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg z-0">
        {/* user list and search */}
        <div className="basis-1/5 max-w-[20%] max-h-full h-full sticky top-28 bg-white rounded-lg">
          <div className="border-b relative py-4 px-2 text-sm h-[10%]">
            <span className="absolute mt-1 p-1 top-4 left-3">
              <box-icon size="sm" color="gray" name="search"></box-icon>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm"
              class="py-2 px-9 border border-gray-200 rounded-lg w-full outline-none focus:focus:border-blue-500"
            />
          </div>
          <div className="user-group-list overflow-y-auto h-[90%] pr-[2px]">
            <ChatParticipant />
            <ChatParticipant />
            <ChatParticipant />
            <ChatParticipant />
            <ChatParticipant />
            <ChatParticipant />
            <ChatParticipant />
            <ChatParticipant />
            
          </div>
        </div>
        {/* message */}
        <div className="basis-3/5 overflow-y-auto bg-white rounded-lg">
          <div class="flex flex-col flex-auto h-full p-2">
            <div class="flex flex-col flex-auto flex-shrink-0 rounded-lg bg-gray-100 h-full px-1 pt-1 pb-1">
              <div class="flex flex-col h-full overflow-x-auto mb-2">
                <div class="flex flex-col h-full">
                  <div class="grid grid-cols-12 gap-y-2">
                   <SenderMessage />
                   <SenderMessage />
                   <SenderMessage />
                   <SenderMessage />
                   <SenderMessage />
                   <SenderMessage />
                   <SenderMessage />
                   <ReceivedMessage />
                   <ReceivedMessage />
                   <ReceivedMessage />
                   <ReceivedMessage />
                   <ReceivedMessage />
                  </div>
                  <div ref={bottomAnchor} className="anchor-bottom"></div>
                </div>
              </div>

              {/* input chat */}
              <div class="flex flex-row items-center h-16 rounded-lg bg-white w-full px-4">
                <div>
                  <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="flex-grow ml-4">
                  <div class="relative w-full">
                    <input
                      type="text"
                      class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="ml-4">
                  <button class="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Gửi</span>
                    <span class="ml-2 translate-y-1">
                    <box-icon color="white" name='send'></box-icon>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* info chat */}
        <div className=" basis-1/5 h-full max-w-[20%] max-h-full sticky bg-white rounded-lg z-1">
          <ChatSidePane />
        </div>
      </div>
    </div>
  );
}
