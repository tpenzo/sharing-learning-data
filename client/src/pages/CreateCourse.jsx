import React, { useState } from "react";
import Header from "../components/header/Header";
import StudentList from "../components/ministry/StudentList";
export default function CreateCourse() {
  const [fileName, setFileName] = useState("");

  const handleSubmitFile = (e) => {
    setFileName(e.target.files[0].name);
  };
  return (
    <div className="container xl mx-auto h-screen items-center self-center flex flex-col overflow-hidden">
      <header className="header sticky top-0 w-full h-[12%] max-h-full rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[88%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg z-0">
        <div className="form-create-course basis-2/5 overflow-y-auto bg-white shadow ml-4 mb-1 rounded-lg">
          <div className="title text-lg 2xl:text-xl font-semibold p-3 mt-4 text-center">
            QUẢN LÝ NHÓM HỌC PHẦN
          </div>
          <form className="ml-6" action="">
            <div className="mt-4">
              <label
                className="text-base font-medium"
                htmlFor="createCourseName"
              >
                Tên nhóm{" "}
              </label>
              <input
                className="bg-gray-50 block mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                name="createCourseName"
                type="text"
              />
            </div>
            <div className="mt-4">
              <label
                className="text-base font-medium"
                htmlFor="createTeacherName"
              >
                Giảng viên hướng dẫn{" "}
              </label>
              <input
                className="bg-gray-50 block mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                name="createTeacherName"
                type="text"
                list="teacherList"
              />
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
            <div className="mt-4">
              <label
                className="text-base font-medium"
                htmlFor="createTeacherName"
              >
                Học kỳ - Niên khoá:{" "}
              </label>
              <div className="flex items-center mt-1">
                <select
                  id="createSemester"
                  class="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>Hè</option>
                </select>
                <select
                  id="createSchoolYear"
                  placeholder="Niên khoá"
                  class="bg-gray-50 border outline-none ml-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                  <option>2022-2023</option>
                  <option>2021-2022</option>
                  <option>2020-2021</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex flex-row items-center">
              <div
                className="text-base font-medium"
                htmlFor="createStudentList"
              >
                Danh sách sinh viên:{" "}
              </div>
              <label
                className="text-lg font-medium"
                htmlFor="createStudentList"
              >
                <div className="px-2.5 py-2 flex justify-center items-center bg-gray-100 w-full ml-2 rounded-lg hover:bg-gray-300 cursor-pointer">
                  <span className="text-sm">
                    {fileName === "" ? "Chọn tập tin" : fileName}
                  </span>
                  <box-icon name="file-blank"></box-icon>
                </div>
              </label>
              <input
                onChange={handleSubmitFile}
                className="bg-gray-50 hidden border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                id="createStudentList"
                type="file"
              />
            </div>
            <div className="mt-4">
              <label
                className="text-base font-medium"
                htmlFor="createCourseName"
              >
                Ghi chú{" "}
              </label>
              <textarea
                rows="6"
                className="bg-gray-50 block w-[90%] mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                name="courseNote"
                id="courseNote"
              ></textarea>
            </div>

            <div className=" flex justify-end items-center mr-12 mt-6">
              <button
                type="button"
                class="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 outline-none "
              >
                Huỷ
              </button>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 outline-none "
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
        <div className="basis-3/5 bg-white shadow mr-4 mb-1 rounded-lg overflow-y-auto">
          <StudentList />
        </div>
      </div>
    </div>
  );
}
