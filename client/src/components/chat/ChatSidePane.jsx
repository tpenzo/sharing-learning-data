import React from "react";
import { useSelector } from "react-redux";
import { showCode, showImageChat, showNameChat } from "../../utils/handleChat";
import TeacherInfo from "../sidepane/TeacherInfo";
import ListOfUser from "../sidepane/ListOfUser"
import { Wrap, Avatar, AccordionItem, Accordion, AccordionIcon, AccordionButton, AccordionPanel, Box } from "@chakra-ui/react";

function ChatSidePane() {

  const { chat, auth } = useSelector(state => state)
  const { selectedChat } = chat

console.log(selectedChat?.participant[1]?._id === auth.user._id)
  return (
    <div className="flex flex-col justify-center p-3">
      <div className="font-semibold text-base mb-4 pl-2 text-center">
        {
        	!selectedChat?.isGroupChat && <p className="">{showCode(selectedChat, auth.user._id)}</p>
        }
        <p className="uppercase font-semibold">{showNameChat(selectedChat, auth.user._id)}</p>
      </div>
     <div className="flex justify-center">
        {
			!selectedChat?.isGroupChat && (
				<Wrap>
            		<Avatar size="2xl" src={showImageChat(selectedChat, auth.user._id)}></Avatar>
        		</Wrap>
			)
		}
     </div>
    {
       selectedChat?.isGroupChat ? (
        <>
           <div className="mt-3">
                <div className="teacher-info flex flex-col items-center w-full">
                    <div className="teacher-avatar rounded-xl flex items-center">
                        <img className="w-24 h-24 rounded-xl" src={selectedChat?.admin?.urlAvatar} alt="avatar" />
                    </div>
                    <div className="teacher-name">
                        <span className="block text-center font-semibold text-base my-4">{selectedChat?.admin?.fullName}</span>
                    </div>
                    <div className="info-description relative max-w-full text-center bg-white/80 rounded-xl shadow-md px-4 py-2">
                        <span className="text-xs font-medium flex items-center text-gray-700 mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
                        <box-icon color="#4b5563" name="envelope"></box-icon>: {selectedChat?.admin?.email}
                        </span>
                        <span className="text-xs flex font-medium items-center text-gray-700 mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
                        <box-icon color="#4b5563" name="phone"></box-icon>: {selectedChat?.admin?.phoneNumber}
                        </span>
                        <div className="absolute text-xs shadow-sm -top-2 text-center left-1/2 -translate-x-1/2 rounded-lg w-3/5 max-w-[75%] bg-cyan-50 text-cyan-300">
                        	Admin
                        </div>
                    </div>
                </div>
           </div>
           <div className="mt-4 overflow-hidden">
            <Accordion defaultIndex={[0]} allowToggle>
              <AccordionItem border={0}>
                <h2>
                  <AccordionButton className="hover:bg-inherit rounded-lg">
                    <Box className="text-primary-blue text-base font-semibold" as="span" flex="1" textAlign="left">
                        Danh sách thành viên
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel className="overflow-y-auto h-44 2xl:h-72">
                  <ul>
                    {
                        selectedChat?.participant.map(user => 
                            <li
                                title={user?.fullName}
                                className="user-info flex flex-row justify-start items-center w-full py-2 px-2 list-none bg-inherit hover:bg-white hover:shadow-hover-button rounded-xl mt-1 mx-auto cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden"
                            >
                                <Wrap>
                                    <Avatar size="xs" src={user?.urlAvatar}></Avatar>
                                </Wrap>
                                <div className="max-w-[75%] ml-3">
                                    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap overflow-ellipsis overflow-hidden">
                                      {user?.fullName}
                                    </span>
                                </div>
                            </li>
                        )
                    }
                  </ul>
                </AccordionPanel>
            </AccordionItem>
          </Accordion>
          </div>
        </>
       ) : (
		      <div className="mt-1 info-description relative max-w-full text-center bg-white/80 rounded-xl shadow-md px-4 py-2">
            <span className="text-xs font-medium flex items-center text-gray-700 mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
            	<box-icon color="#4b5563" name="envelope"></box-icon>
				        <span className="ml-3">
                  {selectedChat?.participant[0]?._id === auth.user._id ? selectedChat?.participant[1]?.email : selectedChat?.participant[0]?.email}
                </span>
            </span>
            <span className="text-xs flex font-medium items-center text-gray-700 mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
            	<box-icon color="#4b5563" name="phone"></box-icon>
				        <span className="ml-3">
                  {selectedChat?.participant[0]?._id === auth.user._id ? selectedChat?.participant[1]?.phoneNumber : selectedChat?.participant[0]?.phoneNumber}
                </span>
            </span>
          </div>
	   )
    }
    </div>
  );
}

export default ChatSidePane;
