import React from "react";

function ChatSidePane() {
  return (
    <div className="flex flex-col justify-center p-3">
      <div className="font-semibold text-base mb-4 pl-2 text-center">
        <p className="uppercase font-semibold">Ct113</p>
        <p className="">Nhập môn trí tuệ nhân tạo</p>
      </div>
      <figure className="flex justify-center">
        <img
          src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
          className="object-cover rounded-xl h-32"
          alt=""
        />
      </figure>
      {/* <div className="font-semibold py-4">Ngày tạo 22/03/2023</div> */}
      <div className="mt-5">
        <span className="font-medium text-sm">Mô tả</span>
        <p className="text-gray-600 font-light text-xs px-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eaque! Laborum cupiditate aut nulla nisi placeat nobis ex, omnis quas asperiores suscipit cumque esse neque inventore alias, voluptate eius tenetur.</p>
      </div>
    </div>
  );
}

export default ChatSidePane;
