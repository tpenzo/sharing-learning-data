import React, { useEffect, useState, useRef } from "react";
import {
  getTeacherListAPI,
  createCourseAPI,
  getCourseAPI,
  getUserInfoAPI,
  getInfoByStudentCodeAPI,
  updateCourseAPI,
} from "../Api/coursesAPI";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import { inputStudentSchema } from "../utils/schemaExcel";
import { getCoursesList } from "../Api/coursesAPI";
import showToast from "../Api/showToast";
import courses from "../data/CoursesData";
import Header from "../components/header/Header";
import StudentList from "../components/ministry/StudentList";

export default function CreateCourse(props) {
  const [fileName, setFileName] = useState("");

  const [courseID, setcourseID] = useState("");
  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeachername] = useState("");
  const [semester, setSemester] = useState("1");
  const [schoolYear, setSchoolYear] = useState("2022-2023");
  const [studentList, setStudentList] = useState([]);
  const [description, setdescription] = useState("");
  const [groupNumber, setGroupNumber] = useState("");

  const [teacherList, setTeacherList] = useState([]);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const teacherListData = useSelector(
    (state) => state.allCoursesList.teacherList
  );

  //fetch data for manage func
  useEffect(() => {
    if (courseId) {
      getCourseAPI(courseId).then((course) => {
        setCourseInfo(course),
          setStudentList([]),
          //after set data for course, fetch data for student list from _id stored in course
          course.studentList.forEach((student) => {
            getUserInfoAPI(student).then((studentInfo) => {
              setStudentList((studentList) => [...studentList, studentInfo]);
            });
          });
      });
    }
  }, []);

  const handleSubmitFile = (e) => {
    //schema for input excel file
    const schema = inputStudentSchema;
    if (e.target.files) {
      readXlsxFile(e.target.files[0], { schema }).then(({ rows, errors }) => {
        if (errors.length === 0) {
          setFileName(e.target.files[0].name);
          setStudentList([])
          rows.forEach((student) => {
            getInfoByStudentCodeAPI(student.studentCode).then((studentInfo) => {
              setStudentList((studentList) => [...studentList, studentInfo]);
            });
          });
          // setStudentList(rows);
          console.log(rows);
        } else {
          showToast(
            "Vui lòng chọn lại tập tin đúng định dạng để nhập",
            "warning"
          );
        }
      });
    }
  };

  //set course info for manage func
  const setCourseInfo = async (course) => {
    const teacherInfo = teacherListData.find((teacher) => {
      return teacher._id == course.teacher;
    });
    setcourseID(course.courseID);
    setCourseName(course.name);
    setTeachername(`${teacherInfo.teacherCode}-${teacherInfo.fullName}`);
    setdescription(course.description);
    setGroupNumber(course.groupNumber);
    setSemester(course.semester);
    setSchoolYear(course.schoolyear);
    setGroupNumber(course.groupNumber);
  };

  //submit course handle
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const teacherCode = teacherName.split("-")[0];
    const teacher = teacherList.find((teacher) => {
      return teacher.teacherCode === teacherCode;
    })?._id;
    const students_id = studentList.map((student) => student._id);
    //package data
    const courseDataSubmit = {
      courseID: courseID,
      name: courseName,
      teacher: teacher,
      description: description,
      groupNumber: groupNumber,
      studentList: students_id,
      semester: semester,
      schoolyear: schoolYear,
      chatGroup: null,
    };
    //submit api
    //if in manage func
    if (courseId) {
      await updateCourseAPI(courseDataSubmit);
      showToast("Cập nhật thông tin thành công", "success");
    } else {
      //if in create func
      await createCourseAPI(courseDataSubmit);
    }

    //update courses data
    const fetchData = async ()=>{
      await getCoursesList(dispatch)
     }
     fetchData()
  };

  //get teacher data to display suggestion
  useEffect(() => {
    getTeacherListAPI(dispatch);
    setTeacherList(teacherListData);
  }, []);

  //watch courseID to auto fill courseName when in create func
  useEffect(() => {
    if (!courseId) {
      if (courseID.length > 4) {
        const selectedCourse = courses.find((course) => {
          return course.courseId === courseID;
        });
        if(selectedCourse){
          setCourseName(selectedCourse.courseName);
        }
      }
    }
  }, [courseID]);

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
            <div className="flex justify-start items-center w-full">
              <div className="mt-4 w-1/4">
                <label className="text-sm font-medium" htmlFor="courseID">
                  Mã Học Phần
                </label>
                <input
                  value={courseID}
                  onChange={(e) => {
                    setcourseID(e.target.value);
                  }}
                  autoComplete="off"
                  className={`bg-gray-50 block w-full mt-1 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 
                            ${
                              courseId
                                ? "cursor-not-allowed text-gray-400 font-thin"
                                : "text-gray-900"
                            }`}
                  id="courseID"
                  name="courseID"
                  type="text"
                  list="courseIDList"
                  required
                  disabled={courseId ? true : false}
                />

                {/* suggestion for courseID */}
                <datalist id="courseIDList">
                  {courseID.length > 1 &&
                    courses.map((course) => {
                      return (
                        <option key={course.courseId} value={course.courseId}>
                          {course.courseId + " - " + course.courseName}
                        </option>
                      );
                    })}
                </datalist>
              </div>
              <div className="mt-4 ml-2 w-1/4">
                <label className="text-sm font-medium" htmlFor="groupNumber">
                  Nhóm
                </label>
                <input
                  value={groupNumber}
                  onChange={(e) => setGroupNumber(e.target.value)}
                  autoComplete="off"
                  className={`bg-gray-50 block mt-1 w-full border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                             ${
                               courseId
                                 ? "cursor-not-allowed text-gray-400 font-thin"
                                 : "text-gray-900"
                             }`}
                  id="groupNumber"
                  name="groupNumber"
                  type="text"
                  required
                  disabled={courseId ? true : false}
                />
              </div>
            </div>

            {/* coursename */}
            <div className="mt-4">
              <label className="text-sm font-medium" htmlFor="courseName">
                Tên nhóm
              </label>
              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                autoComplete="off"
                className={`bg-gray-50 block mt-1 w-[71%] border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                          ${
                            courseId
                              ? "cursor-not-allowed text-gray-400 font-thin"
                              : "text-gray-900"
                          }`}
                id="courseName"
                name="courseName"
                type="text"
                required
                disabled={courseId ? true : false}
              />
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
                        ></option>
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
                  disabled={courseId ? true : false}
                  className={`bg-gray-50 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                            ${
                              courseId
                                ? "cursor-not-allowed text-gray-400 font-thin"
                                : "text-gray-900"
                            }`}
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
                  disabled={courseId ? true : false}
                  className={`bg-gray-50 border outline-none ml-1 border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                            ${
                              courseId
                                ? "cursor-not-allowed text-gray-400 font-thin"
                                : "text-gray-900"
                            }`}
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
                <div
                  className={`px-2.5 py-2 flex justify-center items-center bg-gray-100 w-full ml-2 rounded-lg  
                 ${
                   courseId
                     ? "cursor-not-allowed text-gray-300 font-thin hover:bg-gray-100"
                     : "hover:bg-gray-300 cursor-pointer"
                 }`}
                >
                  <span className="text-xs">
                    {fileName === "" ? "Chọn tập tin" : fileName}
                  </span>
                  <box-icon
                    name="file-blank"
                    color={courseId ? "gray" : "black"}
                  ></box-icon>
                </div>
              </label>
              <input
                onChange={handleSubmitFile}
                className="bg-gray-50 hidden border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                id="studentList"
                name="studentList"
                type="file"
                accept=".xlsx, .xls"
                disabled={courseId ? true : false}
              />
            </div>

            {/* note */}
            <div className="mt-3">
              <label className="text-sm font-medium" htmlFor="description">
                Ghi chú
              </label>
              <textarea
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                rows="2"
                className="bg-gray-50 block w-[90%] mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                name="description"
                id="description"
              ></textarea>
            </div>

            {/* button field */}
            <div className=" flex justify-end items-center mr-12 mt-6">
              <Link to={"/ministry/manage"}>
                <button
                  type="button"
                  className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 outline-none "
                >
                  Huỷ
                </button>
              </Link>
              <button
                onClick={handleSubmitForm}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 outline-none "
              >
                {courseId ? "Cập nhật" : "Lưu"}
              </button>
            </div>
          </form>
        </div>
        <div className="basis-3/5 bg-white shadow mr-4 mb-1 rounded-lg">
          <StudentList
            setStudentList={setStudentList}
            studentList={studentList}
          />
        </div>
      </div>
    </div>
  );
}
