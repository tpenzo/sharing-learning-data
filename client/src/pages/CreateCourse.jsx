import React, { useState } from "react";
import Header from "../components/header/Header";
import StudentList from "../components/ministry/StudentList";

export default function CreateCourse() {
  const [fileName, setFileName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeachername] = useState("");
  const [semester, setSemester] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [fileStudentList, setFileStudentList] = useState([]);
  const [courseNote, setCourseNote] = useState("");

  const handleSubmitFile = (e) => {
    setFileName(e.target.files[0].name);
    if(e.target.files){
      setFileStudentList([...fileStudentList, e.target.files[0]]);
    console.log(e.target.files[0]);
    }
    //handle display in studentlist
  };

  const handleSubmitForm = () => {
    //submit api
    console.log(courseId, courseName, courseNote, teacherName, fileStudentList, semester, schoolYear);
  };

  return (
    <div className="container xl mx-auto h-screen items-center self-center flex flex-col overflow-hidden">
      <header className="header sticky top-0 w-full h-[12%] max-h-full rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[88%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg z-0">
        <div className="form-create-course basis-2/5 bg-white shadow ml-4 mb-1 rounded-lg overflow-y-auto">
          <div className="title sticky bg-inherit top-0 text-lg font-semibold p-3 mt-4 text-center">
            QUẢN LÝ NHÓM HỌC PHẦN
          </div>
          <form className="ml-6">
            {/* courseId, coursename */}
            <div className="flex flex-row justify-start items-center flex-auto">
              <div className="mt-4 w-1/4">
                <label className="text-sm font-medium" htmlFor="courseId">
                  Mã Học Phần
                </label>
                <input
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  autoComplete="off"
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  id="courseId"
                  name="courseId"
                  type="text"
                  required
                />
              </div>
              <div className="mt-4 ml-2">
                <label className="text-sm font-medium" htmlFor="courseName">
                  Tên nhóm
                </label>
                <input
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  autoComplete="off"
                  className="bg-gray-50 block mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  id="courseName"
                  name="courseName"
                  type="text"
                  required
                />
              </div>
            </div>

            {/* teacherName */}
            <div className="mt-4">
              <label className="text-sm font-medium" htmlFor="teacherName">
                Giảng viên hướng dẫn
              </label>
              <input
                value={teacherName}
                onChange={(e) => setTeachername(e.target.value)}
                className="bg-gray-50 block mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                id="teacherName"
                name="teacherName"
                type="text"
                list="teacherList"
                required
              />

              {/* suggestion for teachername */}
              <datalist id="teacherList">
                <option value="Nguyễn văn giảng viên"></option>
                <option value="Nguyễn văn giảng viên c"></option>
                <option value="Nguyễn văn giảng viên"></option>
                <option value="Nguyễn văn giảng viên c"></option>
                <option value="Nguyễn văn giảng viên"></option>
                <option value="Nguyễn văn giảng viên c"></option>
                <option value="Nguyễn văn giảng viên"></option>
                <option value="Nguyễn văn giảng viên c"></option>
              </datalist>
            </div>

            {/* semester-schoolYear */}
            <div className="mt-4">
              <label
                className="text-sm font-medium"
                htmlFor="createTeacherName"
              >
                Học kỳ - Niên khoá
              </label>
              <div className="flex items-center mt-1">
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  id="semester"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">Hè</option>
                </select>
                <select
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                  id="schoolYear"
                  placeholder="Niên khoá"
                  className="bg-gray-50 border outline-none ml-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                  <option>2022-2023</option>
                  <option>2021-2022</option>
                  <option>2020-2021</option>
                </select>
              </div>
            </div>

            {/* studentList file */}
            <div className="mt-6 flex flex-row items-center">
              <div className="text-sm font-medium" htmlFor="studentList">
                Danh sách sinh viên
              </div>
              <label className="text-lg font-medium mr-5" htmlFor="studentList">
                <div className="px-2.5 py-2 flex justify-center items-center bg-gray-100 w-full ml-2 rounded-lg hover:bg-gray-300 cursor-pointer">
                  <span className="text-xs">
                    {fileName === "" ? "Chọn tập tin" : fileName}
                  </span>
                  <box-icon name="file-blank"></box-icon>
                </div>
              </label>
              <input
                onChange={handleSubmitFile}
                className="bg-gray-50 hidden border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                id="studentList"
                name="studentList"
                type="file"
              />
            </div>

            {/* note */}
            <div className="mt-4">
              <label className="text-sm font-medium" htmlFor="courseNote">
                Ghi chú
              </label>
              <textarea
                value={courseNote}
                onChange={(e) => setCourseNote(e.target.value)}
                rows="5"
                className="bg-gray-50 block w-[90%] mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                name="courseNote"
                id="courseNote"
              ></textarea>
            </div>

            {/* button field */}
            <div className=" flex justify-end items-center mr-12 mt-6">
              <button
                type="button"
                className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 outline-none "
              >
                Huỷ
              </button>
              <button
                onClick={handleSubmitForm}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 outline-none "
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
        <div className="basis-3/5 bg-white shadow mr-4 mb-1 rounded-lg">
          <StudentList />
        </div>
      </div>
    </div>
  );
}
