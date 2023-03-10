import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import TableCourse from "../components/table/course/TableCourse";

function ManageCourses() {
  const [tab, setTab] = useState("student");
  const [keyword, setKeyword] = useState("");
  const [closeX, setCloseX] = useState(false);
  const typingTimeoutRef = useRef(null);
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
  useEffect(() => {
    if (keyword.length) {
      setCloseX(true);
    } else {
      setCloseX(false);
    }
  }, [keyword]);
  const handleChangeTab = (e) => {
    setTab(e.target.id);
  };

  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CT242",
      courseName: "Môn gì đó chưa biết",
      responsible: "Nguyễn Công Danh",
      studentQuanlity: 50,
    },
    {
      id: 2,
      code: "CT459",
      courseName: "Hình như là niên luận",
      responsible: "Nguyễn Công Danh",
      studentQuanlity: 15,
    },
    {
      id: 3,
      code: "CT559",
      courseName: "Hình như là Luận văn",
      responsible: "Nguyễn Công Danh",
      studentQuanlity: 15,
    },
    {
      id: 4,
      code: "CT113",
      courseName: "Toán rời rạc",
      responsible: "Cô Phương hả gì đó",
      studentQuanlity: 50,
    },
    {
      id: 4,
      code: "CT113",
      courseName: "Toán rời rạc",
      responsible: "Cô Phương hả gì đó",
      studentQuanlity: 50,
    },
    {
      id: 4,
      code: "CT113",
      courseName: "Toán rời rạc",
      responsible: "Cô Phương hả gì đó",
      studentQuanlity: 50,
    },
    {
      id: 4,
      code: "CT113",
      courseName: "Toán rời rạc",
      responsible: "Cô Phương hả gì đó",
      studentQuanlity: 50,
    },
    {
      id: 4,
      code: "CT113",
      courseName: "Toán rời rạc",
      responsible: "Cô Phương hả gì đó",
      studentQuanlity: 50,
    },
  ]);
  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50">
        <Header />
      </header>

      <div className="main-content w-full h-[90%] pt-4 bg-white/60 rounded-b-lg z-0">
        <div className="w-4/5 mx-auto h-full">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Danh sách Học phần</h3>
            <div className="flex relative">
              <span className="cursor-pointer pl-1 absolute top-2 xl:top-3 left-2">
                <box-icon name="search-alt-2" color="gray"></box-icon>
              </span>
              <input
                value={keyword}
                onChange={handleSearching}
                className="w-full py-2 xl:py-3 px-10 outline-none rounded-lg bg-gray-100 focus:outline-primary-blue peer"
                type="text"
                placeholder="Tìm kiếm"
              />
              {closeX && (
                <span
                  className="cursor-pointer absolute top-2 xl:top-3 right-2"
                  onClick={() => {
                    setKeyword("");
                  }}
                >
                  <box-icon name="x" color="gray"></box-icon>
                </span>
              )}
            </div>
            <span className="px-3 py-2 font-bold bg-gray-300 cursor-pointer rounded hover:bg-gray-400/60">
              Tạo nhóm học
            </span>
          </div>
          <div className="mt-4 h-5/6 overflow-y-auto">
            <TableCourse courses={courses} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCourses;
