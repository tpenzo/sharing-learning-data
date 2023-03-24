import React, { useEffect, useState } from "react";
import SideNav from "../components/navigation/SideNav";
import CourseInfoPane from "../components/sidepane/CourseInfoPane";
import PostItem from "../components/post/PostItem";
import Header from "../components/header/Header";
import { getCourseAPI } from "../Api/coursesAPI";
import { useParams } from "react-router-dom";
export default function CoursePage() {
  const [course, setCourse] = useState({})
  const [tab, setTab] = useState(false);
  const { idCourse } = useParams();
  const handleChangeTab = (e) => {
    if (e.target.id === "post") {
      setTab(false);
    } else {
      setTab(true);
    }
  };
  useEffect(()=>{
      getCourseAPI(idCourse).then((course)=>{
        setCourse(course)
      })
  }, [idCourse])
  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[90%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg z-0">
        <div className="basis-1/5 w-1/5 max-h-full h-full sticky top-28 bg-white rounded-lg">
          <SideNav />
        </div>

        <div className="basis-3/5 max-w-[56%] overflow-hidden">
          <div className="flex justify-between bg-inherit my-3 sticky top-3">
            <span
              id="post"
              onClick={handleChangeTab}
              className={
                (!tab
                  ? "border-primary-blue border-b-2 text-primary-blue"
                  : "text-gray-400 hover:bg-gray-200") +
                " py-1 w-full text-center text-lg font-semibold cursor-pointer"
              }
            >
              Bài Viết
            </span>
            <span
              id="saved-post"
              onClick={handleChangeTab}
              className={
                (tab
                  ? "border-primary-blue border-b-2 text-primary-blue"
                  : "text-gray-400 hover:bg-gray-200 ") +
                " py-1 w-full text-center text-lg font-semibold cursor-pointer"
              }
            >
              Tài liệu
            </span>
          </div>
          <div className="post-list px-3 max-h-[92%] overflow-y-auto">
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </div>
        </div>
        <div className="basis-1/5 w-1/5 h-full max-h-full sticky top-28 bg-white rounded-lg z-1">
          <CourseInfoPane course={course} />
        </div>
      </div>
    </div>
  );
}
