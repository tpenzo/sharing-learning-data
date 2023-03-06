import React from "react";

function ProfilePane() {
  return (
    <div className="flex gap-5">
      <figure>
        <img
          className="w-44 h-44 rounded-full md:h-28 md:w-28"
          src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/328130832_1855564528161017_6159523852991919296_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IWgUVlDGaaEAX92U4k9&tn=FyebmjfgVYuvb5Vi&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfC6CX2823GSb9-cj1trVz0ITH-oLUg9Ct5H2ohRq0IR9g&oe=6401672C"
          alt=""
        />
      </figure>
      <div className="">
        <h4 className="text-3xl font-bold">Dương Anh Thương</h4>
        <div className="mt-3 text-gray-500 font-semibold text-ms">
          <span className="mr-3">0 Bài viết</span>
          <span className="mr-3">0 Người theo dõi</span>
          <span className="mr-3">0 Người đang theo dõi</span>
        </div>
        <p className="mt-3 text-gray-400 font-semibold text-sm">Captain</p>
        <div className="mt-6 flex gap-3 font-semibold ">
          <div className="px-3 py-2 rounded bg-bold-gray text-sm flex gap-1 items-center cursor-pointer duration-300 hover:bg-gray-300">
            <box-icon name="pencil"></box-icon>
            <span>Chỉnh sửa thông tin</span>
          </div>
          <div className="px-3 py-2 rounded text-white text-sm bg-second-blue flex gap-1 items-center cursor-pointer duration-300 hover:bg-primary-blue">
            <box-icon name="user-plus" color="white"></box-icon>
            <span>Theo dõi</span>
          </div>
          <div className="px-3 py-2 rounded text-white text-sm bg-second-blue flex gap-1 items-center cursor-pointer duration-300 hover:bg-primary-blue">
          <box-icon color="white" name='message-square-dots'></box-icon>
            <span>Nhắn tin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePane;
