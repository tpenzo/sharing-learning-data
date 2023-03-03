import React from "react";
import PopularCourseItem from "./popularCourseItem";
function PopularCoursesList(){
const popularCourseList = ["CT251", "CT252","CT253", "CT259","CT254", "CT255","CT256", "CT257","CT258"]
    return (
        <div className="w-full">
            <div className="title ml-4 mb-2 text-primary-blue text-base font-semibold">Khoá học nổi bật</div>
            <div className="w-full h-11/12 popular-courses grid grid-cols-3 gap-1 overflow-y-auto">
                {popularCourseList.map((popularCourseId, index)=>{
                    return(
                        <PopularCourseItem popularCourseId={popularCourseId} key={index}/>
                    )
                })}
            </div>
        </div>
    )
}

export default PopularCoursesList;