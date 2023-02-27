import React from "react";
import SideNav from "../components/navigation/SideNav";
import InfoPane from "../components/sidepane/InfoPane";
export default function HomePage() {
  return (
    <div className="container xl mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[15%] bg-green-100 "></header>
      <div className="main-content w-full h-[82%] mt-4 flex flex-row justify-around gap-5">
        <div className="basis-1/5 max-h-full h-full self-start sticky top-28 shrink bg-gray-100 bg-opacity-70 rounded-lg">
          <SideNav />
        </div>
        <div className="basis-3/5 bg-yellow-50">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            sunt deserunt fugit facere mollitia laborum eius ipsa suscipit,
            laudantium veniam rerum distinctio, dignissimos consequatur
            recusandae a quas. Eum, illo quae!
          </p>
          <p>
            ta illum, quia earum. Sint minus delectus fuga, ut
            iste nisi!
          </p>
        </div>
        <div className="basis-1/5 h-full max-h-full sticky top-28 self-start bg-gray-100 bg-opacity-70 rounded-lg">
          <InfoPane />
        </div>
      </div>
    </div>
  );
}
