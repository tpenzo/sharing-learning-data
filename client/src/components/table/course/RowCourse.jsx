import React, { useEffect, useState } from "react";
import { Tr, Td, Select, Button } from "@chakra-ui/react";
import { getUserInfoAPI } from "../../../Api/coursesAPI";
import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ShowDialog from "../../dialog/ShowDialog";

function RowCourse(props) {
  const { course, stt } = props;
  const [teacherName, setTeacherName] = useState("");
  const showDialogDelete = useDisclosure();

  const getTeacherName = async (teacherId) => {
    const teacherData = await getUserInfoAPI(teacherId);
    setTeacherName(teacherData?.fullName);
  };

  useEffect(() => {
    getTeacherName(course.teacher);
  }, []);

  return (
    <Tr className="text-sm hover:bg-gray-200">
      <Td>{stt + 1}</Td>
      <Td>{course?.courseID}</Td>
      <Td>{course?.groupNumber}</Td>
      <Td>{course?.name}</Td>
      <Td>{teacherName}</Td>
      <Td>{course?.studentList.length}</Td>
      <Td>
        <ul className="flex items-center gap-2">
          <li className="cursor-pointer">
            <span
              onClick={() => {
                showDialogDelete.onOpen();
              }}
            >
              <box-icon title="Xoá" color="gray" name="trash"></box-icon>
            </span>
          </li>
          <li className="cursor-pointer">
            <Link to={`/ministry/manage/${course._id}`}>
              <span>
                <box-icon
                  title="Chỉnh sửa"
                  color="gray"
                  name="pencil"
                ></box-icon>
              </span>
            </Link>
          </li>
        </ul>
      </Td>
      <Td>
        <ShowDialog
          action={"removeCourse"}
          course={course}
          isOpen={showDialogDelete.isOpen}
          onClose={showDialogDelete.onClose}
          title={"Xoá nhóm học phần"}
          content={`Bạn muốn xoá nhóm học phần ${course.courseID}-${course.groupNumber}? Hành động này sẽ không thể hoàn tác.`}
          actionName={"Xoá"}
          colorButton={"red"}
        />
      </Td>
    </Tr>
  );
}

export default RowCourse;
