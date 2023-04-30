import React, { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Header from "../components/header/Header";
import TableAccount from "../components/table/account/TableAccount";
import ModalAddAccountForm from "../components/modal/AddAccountForm";
import ModalAddAccountByFile from "../components/modal/AddAccountByFile";
import { useSelector, useDispatch } from "react-redux";
import {
  getTeacherListAccountAPI,
  getStudentListAccountAPI,
  getMinistryListAccountAPI,
} from "../Api/manageAPI";

function ManageAccount() {
  const [tab, setTab] = useState("student");
  const [searchKey, setSearchKey] = useState("");
  const [closeX, setCloseX] = useState(false);
  const addAccountForm = useDisclosure();
  const addAccountFile = useDisclosure();
  const dispatch = useDispatch();

  const [accounts, setAccounts] = useState([]);
  const [filterResultList, setFilterResultList] = useState([]);
  const [version, setVersion] = useState(0);
  const studentAccounts = useSelector((state) => state.manage.studentList);
  const teacherAccounts = useSelector((state) => state.manage.teacherList);
  const ministryAccounts = useSelector((state) => state.manage.ministryList);

  const handleSearch = () => {
    var filterResult = [...accounts];
    console.log(searchKey)
    filterResult = filterResult.filter((item) => {
      //filter base on name and studentCode
      return (
        JSON.stringify(item?.email)
          .toLowerCase()
          .includes(searchKey.trim().toLowerCase()) ||
        JSON.stringify(item?.fullName)
          .toLowerCase()
          .includes(searchKey.trim().toLowerCase()) ||
        JSON.stringify(
          `${item?.studentCode ? item?.studentCode : item?.teacherCode}`
        )
          .toLowerCase()
          .includes(searchKey.trim().toLowerCase())

          // if student
        //    ||
        // JSON.stringify(item?.class)
        //   .toLowerCase()
        //   .includes(searchKey.trim().toLowerCase())
      );
    });
    setFilterResultList(filterResult.length === 0 ? accounts : filterResult);
  };

  useEffect(() => {
    handleSearch();
  }, [searchKey]);

  useEffect(() => {
    setVersion(version);
  }, [version]);
  //get first data
  useEffect(() => {
    getStudentListAccountAPI(dispatch).then((response)=>{
      setAccounts(response);
    });
    getTeacherListAccountAPI(dispatch);
    getMinistryListAccountAPI(dispatch);
    
    setFilterResultList(accounts);
  }, []);

  useEffect(() => {
    setFilterResultList(accounts);
  }, [accounts]);

  const handleChangeTab = (e) => {
    setTab(e.target.id);
  };

  //fetch data when change tab
  useEffect( () => {
    switch (tab) {
      case "student":
        getStudentListAccountAPI(dispatch);
        setAccounts(studentAccounts);
        setFilterResultList(studentAccounts);
      break;

      case "teacher":
        getTeacherListAccountAPI(dispatch);
        setAccounts(teacherAccounts);
        setFilterResultList(teacherAccounts);
      break;

      case "ministry":
        getMinistryListAccountAPI(dispatch);
        setAccounts(ministryAccounts);
        setFilterResultList(ministryAccounts);
      break;
    }
  }, [accounts, tab]);

  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50 border-b-[1px]">
        <Header />
      </header>

      <div className="main-content w-full h-[90%] pt-4 bg-white rounded-b-lg">
        <div className="w-[95%] mx-auto h-full">
          <div className=" flex justify-between">
            <span
              id="student"
              onClick={handleChangeTab}
              className={
                (tab === "student"
                  ? "border-primary-blue border-b-2 text-primary-blue"
                  : "text-gray-400 hover:bg-gray-200") +
                " py-1 w-full text-center text-lg font-semibold cursor-pointer"
              }
            >
              Tài khoản Sinh viên
            </span>
            <span
              id="teacher"
              onClick={handleChangeTab}
              className={
                (tab === "teacher"
                  ? "border-primary-blue border-b-2 text-primary-blue"
                  : "text-gray-400 hover:bg-gray-200 ") +
                " py-1 w-full text-center text-lg font-semibold cursor-pointer"
              }
            >
              Tài khoản Giảng viên
            </span>
            <span
              id="ministry"
              onClick={handleChangeTab}
              className={
                (tab === "ministry"
                  ? "border-primary-blue border-b-2 text-primary-blue"
                  : "text-gray-400 hover:bg-gray-200 ") +
                " py-1 w-full text-center text-lg font-semibold cursor-pointer"
              }
            >
              Tài khoản Giáo vụ
            </span>
          </div>
          <div className="pt-5 flex justify-between items-center">
            {/* <h3 className="text-lg font-bold">Danh sách tài khoản</h3> */}
            <div className="flex relative ml-1">
              <span className="cursor-pointer pl-1 absolute top-[10px] left-2">
                <box-icon name="search-alt-2" color="gray"></box-icon>
              </span>
              <input
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                className="w-full py-2 pl-10 pr-3 border-gray-200 border outline-none rounded-lg bg-gray-100 focus:outline-fourth-blue peer"
                type="search"
                placeholder="Tìm kiếm"
              />
              {closeX && (
                <span
                  className="cursor-pointer absolute top-2 right-2"
                  onClick={() => {
                    setKeyword("");
                  }}
                >
                  <box-icon name="x" color="gray"></box-icon>
                </span>
              )}
            </div>
            <div className="">
              <span
                onClick={addAccountFile.onOpen}
                className="px-4 py-3 font-medium bg-orange-600 cursor-pointer text-sm rounded-lg text-gray-100 hover:bg-orange-700"
              >
                Nhập tập tin
              </span>
              <span
                onClick={addAccountForm.onOpen}
                className="px-4 py-3 font-medium ml-4 bg-green-700 cursor-pointer text-sm rounded-lg text-gray-100 hover:bg-green-800"
              >
                Thêm tài khoản
              </span>
            </div>
          </div>
          <div className="mt-4 h-[79%] overflow-y-auto w-full rounded-lg flex justify-center border border-gray-200">
            <TableAccount
              key={version}
              version={version}
              setVersion={setVersion}
              action={"modify"}
              setAccounts={setAccounts}
              accounts={filterResultList}
              roles={tab}
            />
          </div>
        </div>

        <div className="">
          <ModalAddAccountForm
          version={version}
          setVersion={setVersion}
            action="create"
            title={"Tạo tài khoản"}
            setAccounts={setAccounts}
            isOpen={addAccountForm.isOpen}
            onClose={addAccountForm.onClose}
          />

          <ModalAddAccountByFile
          setVersion={setVersion}
            tab={tab}
            setAccounts={setAccounts}
            isOpen={addAccountFile.isOpen}
            onClose={addAccountFile.onClose}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
