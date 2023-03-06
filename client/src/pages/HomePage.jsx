import React from "react";
import SideNav from "../components/navigation/SideNav";
import InfoPane from "../components/sidepane/InfoPane";
import PostItem from "../components/post/PostItem";
import Header from "../components/header/Header";
export default function HomePage() {
  return (
    <div className="container mx-auto  h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content flex-initial w-full h-[89%] pt-4 flex flex-row justify-center gap-5 bg-white/60 rounded-b-lg z-0">
        <div className="basis-1/5 w-1/5 max-h-full h-full sticky top-28 bg-white rounded-lg">
          <SideNav />
        </div>
        <div className="basis-3/5 max-w-[56%] px-3 overflow-y-auto">
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
        <div className=" basis-1/5 w-1/5 h-full max-h-full sticky top-28 bg-white rounded-lg z-1">
           <InfoPane />
        </div>
      </div>
    </div>
  );
}
