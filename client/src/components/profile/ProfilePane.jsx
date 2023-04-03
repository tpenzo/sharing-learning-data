import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { profileGetUserAPI } from "../../Api/userAPI.js";
import BtnFollow from "./BtnFollow.jsx";
import axiosClient from "../../Api/axiosClient.js";
import { setSelectedChat } from "../../redux/ChatSlice.js";
import { useNavigate } from 'react-router-dom'
import { Avatar, Wrap, useDisclosure } from "@chakra-ui/react";
import EditInfo from "../modal/EditInfo.jsx";

function ProfilePane() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { auth, profile } = useSelector(state => state)
    const posts = useSelector(state => state.profile.posts)
    const { userId } = useParams()

    // state
    const [info, setInfo] = useState(null)

    useEffect(() => {
        if (userId === auth.user._id) {
            setInfo(auth.user)
        }
        else if (userId === profile.user?._id) {
            setInfo(profile.user)
        }
        else {
            // Call API
            profileGetUserAPI(userId, dispatch)
            // if user does not exist [NO PROCESS]
        }
    }, [auth.user, profile.user, userId, dispatch])

    /* When the user clicks on the message on the profile, 
        if the chat already exists it will go to the chat page 
        if the conversation does not exist then create a new one and go to the chat page.
    */
    const goToChat = async () => {
        const res = await axiosClient.post('/api/chat/access', { userId: profile.user._id })
        await dispatch(setSelectedChat(res.data))
        navigate('/chat')
    }

    return (
        <>
            {
                isOpen && <EditInfo isOpen={isOpen} onClose={onClose} />
            }
            <div className="flex gap-5">
                <Wrap>
                    <Avatar size='2xl' src={info?.urlAvatar}></Avatar>
                </Wrap>
                <div className="">
                    <h4 className="text-3xl font-bold">{info?.fullName}</h4>
                    <div className="mt-3 text-gray-500 font-semibold text-ms">
                        <span className="mr-3">{posts.length} Bài viết</span>
                        <span className="mr-3">{info?.follower.length} Người theo dõi</span>
                        <span className="mr-3">{info?.following.length} Người đang theo dõi</span>
                    </div>
                    <p className="mt-3 text-gray-400 font-semibold text-sm">
                        {info?.role === 'teacher' ? `Giảng viên chính: ${info?.teacherCode}` : `Sinh viên: ${info?.studentCode}`}
                    </p>
                    <div className="mt-6 flex gap-3 font-semibold ">
                        {
                            auth.user._id === info?._id ? (
                                <div className="px-3 py-2 rounded bg-bold-gray text-sm flex gap-1 items-center cursor-pointer duration-300 hover:bg-gray-300"
                                    onClick={() => onOpen()}>
                                    <box-icon name="pencil"></box-icon>
                                    <span>Chỉnh sửa thông tin</span>
                                </div>
                            ) : (
                                <>
                                    <BtnFollow />
                                    <div
                                        onClick={goToChat}
                                        className="px-3 py-2 rounded text-white text-sm bg-second-blue flex gap-1 items-center cursor-pointer duration-300 hover:bg-primary-blue">
                                        <box-icon color="white" name='message-square-dots'></box-icon>
                                        <span>Nhắn tin</span>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePane;
