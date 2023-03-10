import React, { useState } from "react";
import { Tr, Td, Select, Button } from "@chakra-ui/react";
function RowCourse(props) {
  const { course, stt } = props;
  return (
    <Tr>
      <Td>{stt + 1}</Td>
      <Td>{course.code}</Td>
      <Td>{course.courseName}</Td>
      <Td>{course.responsible}</Td>
      <Td>{course.studentQuanlity}</Td>
      <Td>
        <ul className="flex items-center gap-2">
          <li className="cursor-pointer">
            <span>
              <box-icon name="trash"></box-icon>
            </span>
          </li>
          <li className="cursor-pointer">
            <span>
              <box-icon name="pencil"></box-icon>
            </span>
          </li>
        </ul>
      </Td>
    </Tr>
  );
}

export default RowCourse;
