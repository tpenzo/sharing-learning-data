import React, {useRef, useState} from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import RowAccount from "./RowAccount";
import { useDispatch, useSelector } from "react-redux";
import { appendMinistryListAccountAPI, appendStudentListAccountAPI, appendTeacherListAccountAPI } from "../../../Api/manageAPI";
import { current } from "@reduxjs/toolkit";
import showToast from "../../../Api/showToast";
function TableAccount(props) {
  const { accounts, roles, setAccounts, action, setFilterResultList, version , setVersion } = props;
  const dispatch = useDispatch();
  var [ studentPage, setStudentPage] = useState(1);
  var [ teacherPage, setTeacherPage] = useState(1);
  var [ ministryPage, setMinistryPage] = useState(1);
  const maxPerPage = useRef(40);
  const [isLoading, setIsLoading] = useState(false);
  const studentAccounts = useSelector((state) => state.manage.studentList);
  const teacherAccounts = useSelector((state) => state.manage.teacherList);
  const ministryAccounts = useSelector((state) => state.manage.ministryList);
  const {studentListTotal, teacherListTotal, ministryListTotal} = useSelector((state) => state.manage)

  const showMore = async () => {
    switch(roles){
      case "student":
        if(accounts.length < studentListTotal){
          setIsLoading(true);
          setStudentPage(++studentPage);
          await appendStudentListAccountAPI(dispatch, studentPage)
          setAccounts(studentAccounts);
          setIsLoading(false);
          console.log(studentPage);
        } else{
          showToast("Không còn tài khoản sinh viên nào nữa", "warning");
        }
      break;

      case "teacher":
        setIsLoading(true);
        if(accounts.length < teacherListTotal ){
          setTeacherPage(++teacherPage);
          await appendTeacherListAccountAPI(dispatch, teacherPage)
          setAccounts(teacherAccounts);
          setIsLoading(false);
          console.log(accounts.length);
        } else{
          setIsLoading(false);
          showToast("Không còn tài khoản giảng viên nào nữa", "warning");
        }
      break;

      case "ministry":
        setIsLoading(true);
        if(accounts.length < ministryListTotal){
          setMinistryPage(++ministryPage);
          await appendMinistryListAccountAPI(dispatch, ministryPage)
          setAccounts(ministryAccounts);
          setIsLoading(false);
        } else{
          setIsLoading(false);
          showToast("Không còn tài khoản giáo vụ nào nữa", "warning");
        }
      break;
    }
  };
  return (
    <TableContainer className="w-full" overflowX="unset" overflowY="auto">
      <Table overflowY="auto" colorScheme={"facebook"}>
        <Thead position={"sticky"} top={0} zIndex="docked">
          <Tr className="bg-blue-400">
            <Th color={"white"}>STT</Th>
            <Th color={"white"}>{roles === "teacher" ? "MSCB" : roles === "student" ? "MSSV" : "Mã số"}</Th>
            <Th color={"white"}>Họ và tên</Th>
            <Th color={"white"}>Loại tài khoản</Th>
            <Th color={"white"}>Tùy chọn</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accounts &&
            accounts.length > 0 &&
            accounts.map((account, index) => {
              return (
                <RowAccount
                setVersion={setVersion}
                  version={version}
                  action={action}
                  setAccounts={setAccounts}
                  key={account._id || index}
                  account={account}
                  stt={index}
                />
              );
            })}
          {
           action === "modify" && accounts && accounts.length > 15 &&
            <Tr>
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
            </Tr>
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableAccount;
