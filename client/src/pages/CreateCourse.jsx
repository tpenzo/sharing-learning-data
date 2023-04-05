import React, { useEffect, useState } from "react";
import {
  getTeacherListAPI,
  createCourseAPI,
  getCourseAPI,
  getInfoByStudentCodeAPI,
  updateCourseAPI,
} from "../Api/coursesAPI";
import { Button } from "@chakra-ui/react";
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
import { createGroupChatAPI } from "../Api/chatAPI";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreateCourse() {
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [semester, setSemester] = useState("1");
  const [schoolYear, setSchoolYear] = useState("2022-2023");
  const [studentList, setStudentList] = useState([]);
  const [description, setdescription] = useState("");
  const formik = useFormik({
    initialValues: {
      courseID: "",
      courseName: "",
      teacherName: "",
      groupNumber: "",
      studentListLength: "",
    },
    validationSchema: Yup.object({
      courseID: Yup.string().required("Không được để trống"),
      courseName: Yup.string().required("Vui lòng nhập tên nhóm"),
      teacherName: Yup.string().required("Vui lòng chọn giảng viên hướng dẫn"),
      groupNumber: Yup.string().required("Không được để trống"),
    }),
    onSubmit: () => {
      handleSubmitForm();
    },
  });

  const { values, handleSubmit, setFieldValue } = formik;
  const { courseID, courseName, teacherName, groupNumber, studentListLength } =
    values;

  const [teacherList, setTeacherList] = useState([]);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const teacherListData = useSelector(
    (state) => state.allCoursesList.teacherList
  );
  const {user} = useSelector(state=> state.auth)

  //get teacher data to display suggestion auto fill
  useEffect(() => {
    getTeacherListAPI(dispatch);
    setTeacherList(teacherListData);
  }, []);

  const resetData = ()=>{
      setSemester("1")
      setSchoolYear("2022-2023")
      setdescription("")
      setStudentList([])
      setFileName("")
      formik.resetForm();
  }

  //fetch data for manage func
  useEffect(() => {
    if (courseId) {
      getCourseAPI(courseId).then((course) => {
        setCourseInfo(course),
          setStudentList(course.studentList),
          setFieldValue("studentListLength", studentList.length);
      });
    }
  }, []);

   //watch studentList to update the number of students
   useEffect(() => {
    setFieldValue("studentListLength", studentList.length);
  }, [studentList]);

  const handleSubmitFile = (e) => {
    //schema for input excel file
    const schema = inputStudentSchema;
    if (e.target.files) {
      readXlsxFile(e.target.files[0], { schema }).then(({ rows, errors }) => {
        if (errors.length === 0) {
          setFileName(e.target.files[0].name);
          setStudentList([]);
          rows.forEach((student) => {
            getInfoByStudentCodeAPI(student.studentCode).then((studentInfo) => {
              setStudentList((studentList) => [...studentList, studentInfo]);
            });
          });
          setFieldValue("studentListLength", rows.length);
          //reset input file 
          e.target.value = null;
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
    setFieldValue("courseID", course.courseID);
    setFieldValue("courseName", course.name);
    setFieldValue(
      "teacherName",
      `${course?.teacher?.teacherCode +"-"+course?.teacher.fullName || "Chưa Phân Công"}`
    );
    setdescription(course.description);
    setFieldValue("groupNumber", course.groupNumber);
    setSemester(course.semester);
    setSchoolYear(course.schoolyear);
  };

  //submit course handle
  const handleSubmitForm = async () => {
    const teacherCode = teacherName.split("-")[0];
    const teacher = teacherList.find((teacher) => {
      return teacher.teacherCode === teacherCode;
    })?._id;
    const students_id = studentList.map((student) => student._id);
    //package data
    let courseDataSubmit = {
      _id: courseId,
      courseID: courseID,
      name: courseName,
      teacher: teacher,
      description: description,
      groupNumber: groupNumber,
      studentList: students_id,
      semester: semester,
      schoolyear: schoolYear,
    };
    //submit api
    //if in manage func
    if (courseId) {
      setIsLoading(true);
      await updateCourseAPI(courseDataSubmit);
      setIsLoading(false);
    } else {
      //if in create func
      setIsLoading(true);
      const groupChat_id = await createGroupChatAPI(courseDataSubmit);
      let chatGroup = groupChat_id;
      await createCourseAPI({ ...courseDataSubmit, chatGroup });
      setIsLoading(false);

      //reset data after create course
      resetData()
    }

    //update courses data
    const fetchData = async () => {
      await getCoursesList(dispatch);
    };
    fetchData();
  };

  //watch courseID to auto fill courseName when in create func
  useEffect(() => {
    if (!courseId) {
      if (courseID.length > 4) {
        const selectedCourse = courses.find((course) => {
          return course.courseId === courseID;
        });
        if (selectedCourse) {
          setFieldValue("courseName", selectedCourse.courseName);
        }
      }
    }
  }, [courseID]);

  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header w-full h-[10%] max-h-full rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[88%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg pb-1.5">
        <div className="form-create-course basis-2/5 bg-white shadow ml-4 mb-1 rounded-lg overflow-y-auto">
          <div className="title sticky bg-inherit top-0 text-lg font-semibold p-2 mt-4 text-center">
            QUẢN LÝ NHÓM HỌC PHẦN
          </div>
          <form onSubmit={handleSubmit} className="ml-6">
            {/* courseID, coursename */}
            <div className="flex justify-start items-center w-full">
              <div className="mt-4 w-1/4">
                <label className="text-sm font-medium" htmlFor="courseID">
                  Mã Học Phần
                </label>
                <input
                  value={courseID}
                  onChange={formik.handleChange}
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
                  disabled={courseId ? true : false}
                />
                <div className="h-1">
                  {formik.errors.courseID && formik.touched.courseID && (
                    <span className="text-[10px] text-red-400">
                      {formik.errors.courseID}
                    </span>
                  )}
                </div>

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
                  onChange={formik.handleChange}
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
                  disabled={courseId ? true : false}
                />
                <div className="h-1">
                  {formik.errors.groupNumber && formik.touched.groupNumber && (
                    <span className="text-[10px] text-red-400">
                      {formik.errors.groupNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* coursename */}
            <div className="mt-4">
              <label className="text-sm font-medium" htmlFor="courseName">
                Tên nhóm
              </label>
              <input
                value={courseName}
                onChange={formik.handleChange}
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
                disabled={courseId ? true : false}
              />
              <div className="h-1">
                {formik.errors.courseName && formik.touched.courseName && (
                  <span className="text-xs text-red-400 ml-2">
                    {formik.errors.courseName}
                  </span>
                )}
              </div>
            </div>
            {/* teacherName */}
            <div className="mt-4">
              <label className="text-sm font-medium" htmlFor="teacherName">
                Giảng viên hướng dẫn
              </label>
              <input
                value={teacherName}
                onChange={formik.handleChange}
                className={`bg-gray-50 w-[71%] block mt-1 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5
                ${user?.role==="teacher" ? "cursor-not-allowed text-gray-400 font-thin" : "text-gray-900"}`}
                id="teacherName"
                name="teacherName"
                type="text"
                list="teacherList"
                autoComplete="off"
                disabled={user?.role==="teacher"}
              />
              <div className="h-1">
                {formik.errors.teacherName && formik.touched.teacherName && (
                  <span className="text-xs text-red-400 ml-2">
                    {formik.errors.teacherName}
                  </span>
                )}
              </div>

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
              <label className="flex-row flex items-center text-lg font-medium mr-5" htmlFor="studentList">
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
                  {/* <span className="text-sm ml-1">
                  ({studentListLength && studentListLength} sinh vien)
                  </span> */}
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
                onChange={formik.handleChange}
                rows="2"
                className="bg-gray-50 block w-[90%] mt-1 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                name="description"
                id="description"
              ></textarea>
            </div>

            {/* button field */}
            <div className=" flex justify-end items-center mr-12 mt-6">
              <Link to={user?.role==="teacher" ? `/courses/${courseId}`: "/ministry/manage"}>
                <Button
                  fontWeight="light"
                  colorScheme="#94a3b8"
                  type="button"
                  className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 outline-none "
                >
                  Huỷ
                </Button>
              </Link>
              <Button
                isLoading={isLoading}
                colorScheme="#1d4ed8"
                type="submit"
                fontWeight="light"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 outline-none "
              >
                {courseId ? "Cập nhật" : "Lưu"}
              </Button>
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
