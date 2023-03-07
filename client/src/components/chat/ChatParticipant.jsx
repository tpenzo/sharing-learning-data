import React from "react";

function ChatParticipant() {
  return (
    <div class="flex flex-row py-4 px-2 justify-center items-center border-b hover:bg-gray-100 cursor-pointer">
      <div class="w-1/3">
        <img
          src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
          class="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div class="w-full ml-2">
        <div class="text-base font-semibold">Luis1994</div>
        <span class="text-gray-400 text-xs">Ngoại tuyến</span>
      </div>
    </div>
  );
}

export default ChatParticipant;
