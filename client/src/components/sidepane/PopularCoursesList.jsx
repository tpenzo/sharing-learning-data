import React from "react";
import PopularCourseItem from "./popularCourseItem";
function PopularCoursesList() {
  const popularCourseList = [
    "CT251",
    "CT252",
    "CT253",
    "CT259",
    "CT254",
    "CT255",
    "CT256",
    "CT257",
    "CT258",
  ];
  return (
    <div className="max-h-full">
      <div className="title ml-4 text-primary-blue text-lg font-semibold">
        Khoá học nổi bật
      </div>
      <div className="popular-item-list mt-2 ml-5 h-[90px]">
        {popularCourseList.map((popularCourseId, index) => {
          return (
            <PopularCourseItem key={index} popularCourseId={popularCourseId} />
          );
        })}
      </div>
    </div>
  );
}

export default PopularCoursesList;
