import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
import TableCourse from "../components/table/course/TableCourse";
import { useSelector, useDispatch } from "react-redux";
import { getCoursesList } from "../Api/coursesAPI";

function ManageCourses() {
  const [tab, setTab] = useState("student");
  const [keyword, setKeyword] = useState("");
  const [closeX, setCloseX] = useState(false);
  const typingTimeoutRef = useRef(null);
  const [courses, setCourses] = useState()

  const dispatch = useDispatch();
  const coursesData = useSelector(state => state.allCoursesList)

  const handleSearching = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      console.log(value);
      // callApi
    }, 500);
  };

  //get all course from redux
  useEffect(()=> {
    const fetchData = async ()=>{
     await getCoursesList(dispatch)
    }
    fetchData()
    setCourses(coursesData.courseList)
  }, []);

  //watch change data courseList in store
  useEffect(()=> {
    setCourses(coursesData.courseList)
  }, [coursesData.courseList]);

  useEffect(() => {
    if (keyword.length) {
      setCloseX(true);
    } else {
      setCloseX(false);
    }
  }, [keyword]);
  
  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[88%] pt-4 bg-white rounded-b-lg z-0">
        <div className="w-[95%] mx-auto h-full overflow-y-hidden">
            {/* <h3 className="text-lg font-bold">Danh sách Học phần</h3> */}
          <div className="flex justify-between items-center mt-3">
            {/* search area */}
            <div className="flex relative ml-1">
              <span className="cursor-pointer pl-1 absolute top-[10px] left-2">
                <box-icon name="search-alt-2" color="gray"></box-icon>
              </span>
              <input
                value={keyword}
                onChange={handleSearching}
                className="w-full py-2 px-10 border-gray-200 border outline-none rounded-lg bg-gray-100 focus:outline-fourth-blue peer"
                type="text"
                placeholder="Tìm kiếm"
              />
              {closeX && (
                <span
                  className="cursor-pointer absolute top-2 right-2"
                  onClick={() => {
                    setKeyword("");
                  }}
                >
                  <box-icon name="x" color="gray"></box-icon>
                </span>
              )}
            </div>
            <Link to={"/ministry/create"}>
            <span className="px-4 py-3 font-bold bg-gray-300 cursor-pointer text-sm rounded-lg text-gray-600 hover:bg-gray-400/60">
              Tạo nhóm học
            </span>
            </Link>
          </div>
          <div className="mt-4 h-[89%] overflow-y-auto w-full rounded-lg flex justify-center border border-gray-200">
            { courses &&
              <TableCourse courses={courses} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCourses;
