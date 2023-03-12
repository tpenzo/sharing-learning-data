import React, { useEffect, useState } from "react";
import { getTeacherListAPI, createCourseAPI } from "../Api/coursesAPI";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import StudentList from "../components/ministry/StudentList";
import readXlsxFile from "read-excel-file";
import showToast from "../Api/showToast";
import courses from "../data/CoursesData";

export default function CreateCourse() {
  const [fileName, setFileName] = useState("");
  const [courseID, setcourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeachername] = useState("");
  const [semester, setSemester] = useState("1");
  const [schoolYear, setSchoolYear] = useState("2022-2023");
  const [studentList, setStudentList] = useState([]);
  const [description, setdescription] = useState("");
  const [teacherList, setTeacherList] = useState([]);

  const dispatch = useDispatch();
  const teacherListData = useSelector(
    (state) => state.allCoursesList.teacherList
  );
  const auth = useSelector(state => state.auth)

  //mapping format for excel file
  const schema = {
    STT: {
      prop: "stt",
      type: String,
    },
    "HO VA TEN": {
      prop: "fullName",
      type: String,
      required: true,
    },
    MSSV: {
      prop: "studentCode",
      type: String,
      required: true,
    },
  };

  const handleSubmitFile = (e) => {
    if (e.target.files) {
      readXlsxFile(e.target.files[0], { schema }).then(({ rows, errors }) => {
        if (errors.length === 0) {
          setFileName(e.target.files[0].name);
          setStudentList(rows);
        } else {
          showToast(
            "Vui lòng chọn lại tập tin đúng định dạng để nhập",
            "warning"
          );
        }
      });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const teacherCode = teacherName.split("-")[0]
    const teacher = teacherList.find((teacher)=>{return teacher.teacherCode === teacherCode})?._id

    //package data
    const courseDataSubmit = {
      courseID: courseID,
      name: courseName,
      teacher: teacher,
      description: description,
      studentList: studentList,
      semester: semester,
      schoolyear: schoolYear,
      chatGroup: null
    }
    //submit api
    console.log(JSON.stringify(courseDataSubmit));
    createCourseAPI(courseDataSubmit)
  };

  //get teacher data to display suggestion
  useEffect(() => {
    getTeacherListAPI(dispatch);
    setTeacherList(teacherListData);
  }, []);

  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col overflow-hidden">
      <header className="header sticky top-0 w-full h-[12%] max-h-full rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[88%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg z-0">
        <div className="form-create-course basis-2/5 bg-white shadow ml-4 mb-1 rounded-lg overflow-y-auto">
          <div className="title sticky bg-inherit top-0 text-lg font-semibold p-3 mt-4 text-center">
            QUẢN LÝ NHÓM HỌC PHẦN
          </div>
          <form className="ml-6">
            {/* courseID, coursename */}
            <div className="flex flex-row justify-start items-center flex-auto">
              <div className="mt-4 w-1/4">
                <label className="text-sm font-medium" htmlFor="courseID">
                  Mã Học Phần
                </label>
                <input
                  value={courseID}
                  onChange={(e) => {setcourseID(e.target.value)}}
                  autoComplete="off"
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  id="courseID"
                  name="courseID"
                  type="text"
                  list="courseIDList"
                  required
                />
                <datalist id="courseIDList">
                  {courseID.length > 2 &&
                    courses.map((course) => {
                      return (
                        <option
                          key={course.courseId}
                          value={course.courseId}
                        >
                          {course.courseId + " - " + course.courseName}
                        </option>
                      );
                    })}
                </datalist>
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
                className="bg-gray-50 w-[71%] block mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                id="teacherName"
                name="teacherName"
                type="text"
                list="teacherList"
                required
              />

              {/* suggestion for teachername */}
              {teacherName && (
                <datalist id="teacherList">
                  {teacherList &&
                    teacherList.map((teacher) => {
                      return (
                        <option
                          key={teacher._id}
                          value={teacher.teacherCode + "-" + teacher.fullName}
                        >
                          {/* {teacher.teacherCode + " - " + teacher.fullName} */}
                        </option>
                      );
                    })}
                </datalist>
              )}
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
                  <option value="2022-2023">2022-2023</option>
                  <option value="2021-2022">2021-2022</option>
                  <option value="2020-2021">2020-2021</option>
                  <option value="2019-2020">2019-2020</option>
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
                accept=".xlsx, .xls"
              />
            </div>

            {/* note */}
            <div className="mt-4">
              <label className="text-sm font-medium" htmlFor="description">
                Ghi chú
              </label>
              <textarea
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                rows="5"
                className="bg-gray-50 block w-[90%] mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                name="description"
                id="description"
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
          <StudentList studentList={studentList} />
        </div>
      </div>
    </div>
  );
}
