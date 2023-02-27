import React, { useState } from "react";
import Header from "../components/Header";
import PostItem from "../components/PostItem";
import ProfilePane from "../components/ProfilePane";
export default function ProfilePage() {
  const [tab, setTab] = useState(false);
  const handleChangeTab = (e) => {
    if (e.target.id === "post") {
      setTab(false);
      // call api my post
    } else {
      setTab(true);

      // call api saved post
    }
  };
  return (
    <main className="container mx-auto">
      <div className="mx-auto md:w-[90%] xl:w-[80%]">
        <Header />
        <div className="mt-8 flex gap-5">
          <div className="xl:w-[30%] md:w-[30%] bg-gray-400">Nav</div>
          <div className="xl:w-[70%] md:w-[70%] p-4 bg-black/5 rounded-xl">
            <ProfilePane />
            <div className="w-full h-[1px] bg-gray-300 mt-6"></div>
            <div className="flex justify-between">
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
                Bài viết
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
            <div className="mt-6 ml-auto w-[20%] px-3 py-2 rounded text-white bg-second-blue flex gap-1 justify-center items-center cursor-pointer duration-300 hover:bg-primary-blue">
              <box-icon name="plus-circle" color="white"></box-icon>
              <span>Đăng bài</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-5">
              <PostItem />
              <PostItem />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
