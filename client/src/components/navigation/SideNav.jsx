import React from "react";
import { Link } from "react-router-dom";
import CourseList from "./courseList";
function SideNav() {
  return (
    <div className="flex flex-col">
      <div className="w-full h-1/5 -mt-6 bg-inherit">
        <Link to={"/"}>
        <div className="flex flex-row items-center justify-center mx-auto bg-third-blue w-[85%] mt-10 2xl:mt-14 p-2 2xl:p-3 text-center text-white rounded-xl shadow-lg hover:bg-fourth-blue hover:shadow-lg cursor-pointer">
          <span className="block px-1 text-lg scale-90 font-semibold">
            <box-icon size="md" color="white" name="home-alt"></box-icon>
          </span>
        <span className="block font-semibold text-base pb-1 ml-1 mr-3">
              Trang chủ
        </span>
        </div>
        </Link>
      </div>

      <div className="max-h-[76%] h-2/3 mt-5 ">
        <CourseList />
      </div>
    </div>
  );
}

export default SideNav;
