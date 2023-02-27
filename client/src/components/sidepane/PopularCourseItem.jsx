import React, { useState } from "react";

function PopularCourseItem(props){
    // const [popularCourse, setPopularCourse] = useState("CT250")

    return (
        <>
        <button type="button" className="inline-block w-[27%] text-[8px] 2xl:text-[10px] border border-green-200 2xl:text-xs py-1 px-1 2xl:px-2 2xl:py-2 text-center m-1 text-green-500 bg-green-200 rounded-lg cursor-pointer focus:ring-2 focus:outline-none focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
            {props.popularCourseId}
        </button>
        </>
        
    )
}

export default PopularCourseItem;