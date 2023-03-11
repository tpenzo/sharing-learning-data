import React, { useEffect, useState } from "react";
import { Tr, Td, Select, Button } from "@chakra-ui/react";
import { getTeacherInfoAPI } from "../../../Api/coursesAPI";

function RowCourse(props) {
  const { course, stt } = props;
  const [teacherName, setTeacherName] = useState("")

  const getTeacherName = async (teacherId)=>{
    const teacherData = await getTeacherInfoAPI(teacherId)
    console.log(teacherData.fullName);
    setTeacherName(teacherData.fullName);
  }

  useEffect(()=>{
    getTeacherName(course.teacher)
  }, [])
  
  return (
    <Tr>
      <Td>{stt + 1}</Td>
      <Td>{course.courseID}</Td>
      <Td>{course.name}</Td>
      <Td>{teacherName}</Td>
      <Td>{course.studentList.length}</Td>
      <Td>
        <ul className="flex items-center gap-2">
          <li className="cursor-pointer">
            <span>
              <box-icon color="gray" name="trash"></box-icon>
            </span>
          </li>
          <li className="cursor-pointer">
            <span>
              <box-icon color="gray" name="pencil"></box-icon>
            </span>
          </li>
        </ul>
      </Td>
    </Tr>
  );
}

export default RowCourse;
