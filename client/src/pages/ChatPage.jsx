import React, { useEffect } from "react";
import Header from "../components/header/Header";
import ChatSidePane from "../components/chat/ChatSidePane";
import MyChats from "../components/chat/MyChats";
import SingleChat from "../components/chat/SingleChat";
import { useSelector } from "react-redux";

export default function ChatPage() {

    const { chat } = useSelector(state => state)
    const { selectedChat } = chat

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
                            className="py-2 px-9 border border-gray-200 rounded-lg w-full outline-none focus:focus:border-blue-500"
                        />
                    </div>
                    {/* Render chat */}
                    <div className="user-group-list overflow-y-auto h-[90%] pt-1 px-2">
                        <MyChats />
                    </div>
                </div>
                {/* message */}
                <div className={`overflow-y-auto bg-white rounded-lg  ${selectedChat ? 'basis-3/5' : 'basis-4/5'}`}>
                    <SingleChat />
                </div>
                {/* info chat */}
                {
                    selectedChat && (
                        <div className=" basis-1/5 h-full max-w-[20%] max-h-full sticky bg-white rounded-lg z-1">
                            <ChatSidePane />
                        </div>
                    )
                }
            </div>
        </div>
    );
}