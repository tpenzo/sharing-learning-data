import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CourseItem(props) {
  // const [courseName, setCourseName] = useState("CourseName");
  // const [courseId, setCourseid] = useState("CourseId");
  const [chosen, setChosen] = useState(false);

  const chooseItem = () => setChosen(!chosen);
  return (
      <Link to={"/courses/" + props.courseInfo.courseId}>
    <li className="courseItem flex felx-row items-center justify-start shrink-0 w-full max-w-full max-h-max py-1 px-3 list-none bg-inherit hover:bg-white hover:shadow-sm rounded-xl mt-1 mx-auto cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden ">
        <div className="w-8 h-8 max-w-[20%] border-[1px] border-gray-300 bg-gray-200 p-2 rounded-xl text-center aspect-square">
          <div className="rounded-full translate-y-1/2 translate-x-[40%] w-2 h-2 bg-emerald-400 my-auto"></div>
        </div>
        <div className=" max-w-[75%] ml-3 ">
          <span
            title={props.courseInfo.courseName}
            className="text-sm block font-semibold text-gray-700 whitespace-nowrap overflow-ellipsis overflow-hidden"
          >
            {props.courseInfo.courseName}
          </span>
          <span className="text-[12px] block text-gray-400">
            {props.courseInfo.courseId}
          </span>
        </div>
    </li>
      </Link>
  );
}

export default CourseItem;
