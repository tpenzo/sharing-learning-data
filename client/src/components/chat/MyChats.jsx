import React, { useEffect, useState } from "react";
import { showImageChat, showNameChat } from "../../utils/handleChat";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../redux/ChatSlice";
import { Box } from "@chakra-ui/layout";
import { fetchChatsAPI } from "../../Api/chatAPI";
import { Avatar, SkeletonCircle, SkeletonText, Wrap } from "@chakra-ui/react";

function MyChats() {

    const { auth, chat } = useSelector(state => state)
    const { selectedChat, chats } = chat
    const dispatch = useDispatch()

    useEffect(() => {
        fetchChatsAPI(dispatch)
    }, [])

    return (
        <>
            {
                chats.length === 0
                    ? (
                        <Box className="h-full" padding='6' boxShadow='lg' bg='white'>
                            <SkeletonCircle size='20' />
                            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                        </Box>
                    ) : (
                        chats.map(chat =>
                            <Box
                                key={chat._id}
                                onClick={() => dispatch(setSelectedChat(chat))}
                            >
                                <div
                                    className={`flex flex-row py-4 px-2 justify-center items-center font-thin cursor-pointer text-gray-600 rounded-xl mb-[2px]
                                    ${selectedChat?._id === chat._id ? "hover:bg-blue-500 bg-blue-600 text-white" : "hover:bg-gray-200 hover:text-gray-800"}`}>
                                    <div className="w-1/3">
                                        <Wrap>
                                            <Avatar src={showImageChat(chat, auth.user._id)}></Avatar>
                                        </Wrap>
                                    </div>
                                    <div className="w-full ml-2">
                                        <div className="text-sm font-semibold">{showNameChat(chat, auth.user._id)}</div>
                                    </div>
                                </div>
                            </Box>
                        )
                    )
            }
        </>
    );
}

export default MyChats;