import React from "react";
import CourseList from "./courseList";
function SideNav() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-1/5 bg-inherit scale-90 2xl:scale-100">
        <div className="flex mx-auto bg-third-blue w-[90%] mt-10 2xl:mt-14 p-2 2xl:p-3 text-center text-white rounded-xl shadow-lg hover:bg-fourth-blue hover:shadow-lg cursor-pointer">
          <span className="inline-block w-1/4 flex-1 px-1 mt-2 text-lg font-semibold">
            <box-icon size="md" color="white" name="home-alt"></box-icon>
          </span>
        <div className="w-3/4 font-semibold text-xl pt-3 2xl:-ml-20 -ml-10 mr-3">Trang chủ</div>
        </div>
      </div>

      <div className="max-h-2/3 h-2/3 mt-8 ">
        <CourseList />
      </div>
    </div>
  );
}

export default SideNav;
