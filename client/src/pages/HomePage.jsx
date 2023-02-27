import React from "react";
import SideNav from "../components/navigation/SideNav";
import InfoPane from "../components/sidepane/InfoPane";
import PostItem from "../components/post/PostItem";
import Header from "../components/header/Header";
export default function HomePage() {
  return (
    <div className="container xl mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[12%] max-h-full rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[87%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg z-0">
        <div className="basis-1/5 max-w-[19%] max-h-full h-full self-start sticky top-28 bg-light-gray/70 rounded-lg">
          <SideNav />
        </div>
        <div className="basis-3/5 overflow-y-auto">
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
        <div className=" basis-1/5 h-full max-w-[20%] max-h-full sticky self-start bg-light-gray rounded-lg z-1">
           <InfoPane />
        </div>
      </div>
    </div>
  );
}
