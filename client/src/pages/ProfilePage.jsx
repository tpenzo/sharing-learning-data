import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ProfilePane from "../components/profile/ProfilePane";
import SideNav from "../components/navigation/SideNav";
import ModalInstance from "../components/modal/ModalInstance";
import FormPost from "../components/form/FormPost";
import { useDisclosure } from "@chakra-ui/react";
import PostListProfile from "../components/profile/PostListProfile";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useSelector(state => state)
  const { userId } = useParams()
  const [tab, setTab] = useState(false);
  
  const handleChangeTab = (e) => {
    if (e.target.id === "post") {
      setTab(false);
    } else {
      setTab(true);
    }
  };

  return (
    <div className="w-[90%] mx-auto h-screen overflow-y-hidden">
      <div className="container mx-auto h-screen">
        <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50 ">
          <Header />
        </header>
        <div className="flex gap-5 bg-white/70 h-[89%] pt-4">
          <div className="w-[20%] bg-white rounded-lg">
            <SideNav />
          </div>
          <div className="w-[80%] p-4 bg-white rounded-xl">
            <div className="flex items-start">
              <ProfilePane />
              {
                //appear creat post when in your profile
                auth?.user._id === userId &&
                <div
                onClick={onOpen}
                className="mt-6 mr-3 ml-auto w-[20%] px-3 py-2 rounded text-white bg-second-blue flex gap-1 justify-center items-center cursor-pointer duration-300 hover:bg-primary-blue"
              >
                <box-icon name="plus-circle" color="white"></box-icon>
                <span>Đăng bài</span>
              </div>
              }
              <div>
                <ModalInstance
                  isOpen={isOpen}
                  onClose={onClose}
                  modalBody={<FormPost onClose={onClose} />}
                  modalName={"Tạo bài viết"}
                />
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mt-6"></div>
            <div className="flex justify-between bg-gray-200">
              <span
                id="post"
                onClick={handleChangeTab}
                className={
                  (!tab
                    ? "border-primary-blue border-b-2 text-primary-blue"
                    : "text-gray-400 hover:bg-gray-200") +
                  " py-1 w-full text-center text-lg font-semibold cursor-pointer"
                }
              >
                Bài Viết
              </span>
              <span
                id="saved-post"
                onClick={handleChangeTab}
                className={
                  (tab
                    ? "border-primary-blue border-b-2 text-primary-blue"
                    : "text-gray-400 hover:bg-gray-200 ") +
                  " py-1 w-full text-center text-lg font-semibold cursor-pointer"
                }
              >
                Đã Lưu
              </span>
            </div>
            <div className="overflow-y-auto h-[65%] bg-gray-200/20">
              <PostListProfile tab={tab}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
