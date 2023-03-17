import React from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";


import RowCourse from "./RowCourse";
function TableCourse(props) {
  const { courses } = props;

  return (
    <TableContainer className=" w-full" overflowX="unset" overflowY="unset">
      <Table overflowY="auto">
        <Thead position={"sticky"} top={0} zIndex="docked" bg={"gray.300"}>
          <Tr>
            <Th>STT</Th>
            <Th>Mã Học phần</Th>
            <Th>Nhóm</Th>
            <Th>Tên nhóm Học phần</Th>
            <Th>Giảng viên phụ trách</Th>
            <Th>Số lượng Sinh viên</Th>
            <Th>Tùy chọn</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses && courses.length > 0 &&
            courses.map((course, index) => {
              return (<RowCourse key={index} course={course} stt={index} />)
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableCourse;
