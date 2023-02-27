import React, { useEffect, useState } from "react";

function CourseItem(props){
    // const [courseName, setCourseName] = useState("CourseName");
    // const [courseId, setCourseid] = useState("CourseId");
    const [chosen, setChosen] = useState(false);

    const chooseItem = ()=>setChosen(!chosen) 
    return(
        <li className="courseItem w-full max-w-full max-h-full py-1 px-3 list-none bg-inherit hover:bg-white hover:shadow-sm rounded-xl mt-1 mx-auto cursor-pointer ">
            <div className="w-8 h-8 inline-block border-[1px] border-gray-300 bg-gray-200 p-2 rounded-xl -mt-2 text-center">
                <div className="rounded-full translate-y-1/2 translate-x-[40%] w-2 h-2 bg-emerald-400 my-auto"></div>
            </div>
            <div title={props.courseInfo.courseName} className="w-[75%] max-w-[75%] inline-block ml-3 whitespace-nowrap overflow-ellipsis ">
                <p className="text-base font-semibold text-gray-700">{props.courseInfo.courseName}</p>
                <p className="text-sm text-gray-400">{props.courseInfo.courseId}</p>
            </div>
        </li> 
    )
}

export default CourseItem;