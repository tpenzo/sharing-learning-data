import React, { useState } from "react";

function PopularCourseItem(props){
    // const [popularCourse, setPopularCourse] = useState("CT250")

    return (
        <button className="text-xs border border-green-200 py-1.5 px-1.5 text-center m-1 text-green-500 bg-green-200 rounded-lg cursor-pointer focus:ring-2 focus:outline-none focus:ring-green-300">
            {props.popularCourseId}
        </button>   
    )
}

export default PopularCourseItem;