import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import { inputAccountSchema } from "../../utils/schemaExcel/";
import showToast from "../../Api/showToast";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import { createAccountAPI } from "../../Api/manageAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentListAccountAPI,
  getMinistryListAccountAPI,
  getTeacherListAccountAPI,
} from "../../Api/manageAPI";
import TableAccount from "../table/account/TableAccount";
function ModalAddAccountByFile(props) {
  const [accountListImported, setAccountListImported] = useState([]);
  const [fileName, setFileName] = useState("");
  const studentAccounts = useSelector((state) => state.manage.studentList);
  const teacherAccounts = useSelector((state) => state.manage.teacherList);
  const ministryAccounts = useSelector((state) => state.manage.ministryList);
  const { onClose, isOpen, setAccounts, tab } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmitFile = (e) => {
    //schema for input excel file
    const schema = inputAccountSchema;
    if (e.target.files) {
      readXlsxFile(e.target.files[0], { schema }).then(({ rows, errors }) => {
        if (errors.length === 0) {
          setFileName(e.target.files[0].name);
          rows.forEach((account) => {
            console.log(account.role);
          });
          setAccountListImported(rows);
        } else {
          showToast(
            "Vui lòng chọn lại tập tin đúng định dạng để nhập",
            "warning"
          );
        }
      });
    }
  };

  const standardizedData = (account) => {
    let submitData = {
      email: account.email,
      fullName: account.fullName,
      password: account.password,
      gender: account.gender === "nam" ? "male" : "female",
      phoneNumber: account.phoneNumber,
      address: account.address,
    };
    if (account.role === "student") {
      const specificStudentData = {
        studentCode: account.studentCode.toUpperCase(),
        major: account.major,
        class: account.class,
      };
      return { ...submitData, ...specificStudentData };
    } else {
      return { ...submitData, teacherCode: account.teacherCode.toUpperCase() };
    }
  };

  const handleAddAccount = async (accountList) => {
    if (accountList.length > 0) {
      setIsLoading(true)
      for await (const account of accountList) {
        let accountInfo = standardizedData(account);
        await createAccountAPI(account.role, accountInfo);
        //loading
      }
      setIsLoading(false)
      reloadAccountList()
    } else {
      showToast("Vui lòng chọn tập tin dữ liệu", "warning");
    }
  };

  const handleSubmitAccountList = async () => {
    await handleAddAccount(accountListImported);
  };

  const refreshState = ()=>{
    setAccountListImported([])
    setFileName("")
  }
  useEffect(()=>{
    refreshState();
  }, [isOpen])

  const reloadAccountList = async () => {
    switch (tab) {
      case "student":
        await getStudentListAccountAPI(dispatch);
        setAccounts(studentAccounts);
        await getTeacherListAccountAPI(dispatch);
        await getMinistryListAccountAPI(dispatch);
        break;

      case "teacher":
        await getTeacherListAccountAPI(dispatch);
        setAccounts(teacherAccounts);
        await getStudentListAccountAPI(dispatch);
        await getMinistryListAccountAPI(dispatch);
        break;

      case "ministry":
        await getMinistryListAccountAPI(dispatch);
        setAccounts(ministryAccounts);
        await getStudentListAccountAPI(dispatch);
        await getTeacherListAccountAPI(dispatch);
        break;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="scale"
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent maxH="680px">
        <ModalHeader>Nhập tập tin</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <div className="h-full">
            <div className="h-1/5 input-file-field w-full flex justify-center border-b-[1px] border-gray-400 pb-2">
              <label className="text-lg font-medium mr-5" htmlFor="accountList">
                <div className="px-2.5 py-4 flex justify-center items-center bg-gray-100 w-full ml-2 rounded-lg hover:bg-gray-200">
                  <span className="text-sm">
                    {fileName ? fileName : "Chọn tập tin xls,xlsx.."}
                  </span>
                  <box-icon name="import"></box-icon>
                </div>
              </label>
              <input
                onChange={handleSubmitFile}
                className="hidden"
                id="accountList"
                name="accountList"
                type="file"
                accept=".xlsx, .xls"
              />
            </div>
            <div className=" mt-4 max-h-96 overflow-y-auto w-full rounded-lg flex justify-center flex-col">
              <span className="text-sm font-medium mb-3">
                Danh sách tài khoản
              </span>
              {accountListImported.length === 0 ? (
                <div className="text-lg text-gray-400 text-center py-4 ">
                  Danh sách trống
                </div>
              ) : (
                <TableAccount action={"view"} accounts={accountListImported} />
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSubmitAccountList}
            type="button"
            colorScheme="blue"
            mr={3}
            isLoading={isLoading}
          >
            {isLoading ? "Đang cập nhật":"Thêm"}
          </Button>
          <Button onClick={onClose}>Huỷ</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalAddAccountByFile;
