import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CourseItem(props) {
  // const [courseName, setCourseName] = useState("CourseName");
  // const [courseId, setCourseid] = useState("CourseId");
  const [chosen, setChosen] = useState(false);
  const {param} = useParams();

  const chooseItem = () => setChosen(!chosen);
  return (
      <Link to={"/courses/" + props.courseInfo._id}>
    <li className="courseItem flex felx-row items-center justify-start shrink-0 w-full max-w-full max-h-max py-1 px-3 list-none bg-inherit hover:shadow-hover-button hover:bg- rounded-xl mt-1 mx-auto cursor-pointer whitespace-nowrap overflow-ellipsis overflow-hidden ">
        <div className="w-8 h-8 max-w-[20%] border-[1px] border-gray-300 bg-gray-100 p-2 rounded-xl text-center aspect-square">
          <div className="rounded-full translate-y-1/2 translate-x-[40%] w-2 h-2 bg-emerald-400 my-auto"></div>
        </div>
        <div className=" max-w-[75%] ml-3 ">
          <span
            title={props.courseInfo.name}
            
            className="text-sm block font-semibold text-gray-700 whitespace-nowrap overflow-ellipsis overflow-hidden"
          >
            {props.courseInfo.name}
          </span>
          <span className="text-[12px] block text-gray-400">
            {`${props.courseInfo.courseID + "-" + `${props.courseInfo?.groupNumber.length===1 ? "0"+ props.courseInfo?.groupNumber : props.courseInfo?.groupNumber}`}`}
          </span>
        </div>
    </li>
      </Link>
  );
}

export default CourseItem;
