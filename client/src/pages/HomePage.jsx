import React from "react";
import Header from "../components/Header";
import PostItem from "../components/PostItem";
export default function HomePage() {
  return (
    <main className="container h-screen xl:h-full mx-auto bg-gradient-to-r from-yellow-100 via-lime-100 to-teal-100">
      <div className="mx-auto md:w-[90%] xl:w-[80%] ">
        <Header />
        <div className="flex gap-5 mt-8">
          <div className="xl:w-[20%] md:w-[30%] bg-slate-400 ">Nav</div>
          <div className="xl:flex-1 md:w-[40%]">
            <PostItem />
            <PostItem />
            <PostItem />
          </div>
          <div className="xl:w-[20%] md:w-[30%] bg-slate-400">SideBar</div>
        </div>
      </div>
    </main>
  );
}
