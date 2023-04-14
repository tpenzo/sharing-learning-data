import React, { useRef, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from "@chakra-ui/react";

import RowCourse from "./RowCourse";
import { appendCourseList } from "../../../Api/coursesAPI";
import { useDispatch, useSelector } from "react-redux";
import showToast from "../../../Api/showToast";
function TableCourse(props) {
  const { courses } = props;
  const dispatch = useDispatch();
  const {coursesCount} = useSelector(state => state.allCoursesList)
  let [page, setPage] = useState(2);
  //max element show per loading time
  const maxPerPage = useRef(15);
  const [isLoading, setIsLoading] = useState(false)

  const showMore = async ()=>{
    console.log(courses.length, coursesCount);
    if(courses.length < coursesCount){
      setIsLoading(true);
    await appendCourseList(dispatch, page);
    setPage(++page);
    setIsLoading(false)
    } else {
      showToast("Không còn khoá học nào nữa", "warning")
    }
  }

  return (
    <TableContainer className=" w-full" overflowX="unset" overflowY="unset">
      <Table overflowY="auto" colorScheme={"facebook"}>
        <Thead position={"sticky"} top={0} zIndex="docked">
          <Tr className="bg-blue-400">
            <Th color={"white"}>STT</Th>
            <Th color={"white"}>Mã Học phần</Th>
            <Th color={"white"}>Nhóm</Th>
            <Th color={"white"}>Niên Khoá</Th>
            <Th color={"white"}>Tên nhóm Học phần</Th>
            <Th color={"white"}>Giảng viên phụ trách</Th>
            <Th color={"white"}>Số lượng</Th>
            <Th color={"white"}>Tùy chọn</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses &&
            courses.length > 0 &&
            courses.map((course, index) => {
              return <RowCourse key={index} course={course} stt={index} />;
            })}
          <Tr>
            {courses && courses.length >= maxPerPage.current && (
              <Td colSpan={"9"} textAlign={"center"}>
                <Button
                  onClick={showMore}
                  isLoading={isLoading}
                  className="bg-blue-300 focus:bg-blue-400 focus:ring-2 focus:ring-blue-500"
                  textColor={"white"}
                >
                  Xem thêm
                </Button>
              </Td>
            )}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableCourse;
