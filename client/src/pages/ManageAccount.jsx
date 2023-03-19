import React, { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Header from "../components/header/Header";
import TableAccount from "../components/table/account/TableAccount";
import ModalAddAccountForm from "../components/modal/AddAccountForm";
import { useSelector, useDispatch } from "react-redux";
import { getTeacherListAccountAPI, getStudentListAccountAPI, getMinistryListAccountAPI } from "../Api/manageAPI";
import EditInfo from "../components/modal/EditInfo";

function ManageAccount() {
  const [tab, setTab] = useState("student");
  const [keyword, setKeyword] = useState("");
  const [closeX, setCloseX] = useState(false);
  const typingTimeoutRef = useRef(null);
  const addAccountForm = useDisclosure();
  const dispatch = useDispatch();

  const [accounts, setAccounts] = useState([]);
  const studentAccounts = useSelector(state => state.manage.studentList)
  const teacherAccounts = useSelector(state => state.manage.teacherList)
  const ministryAccounts = useSelector(state => state.manage.ministryList)


  const handleSearching = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      console.log(value);
      // callApi
    }, 500);
  };

  const handleChangeTab = (e) => {
    setTab(e.target.id);
  };

  useEffect(() => {
    if (keyword.length) {
      setCloseX(true);
    } else {
      setCloseX(false);
    }
  }, [keyword]);
  

  //fetch data when change tab
  useEffect(() => {
    
    switch (tab) {
      case "student":
        getStudentListAccountAPI(dispatch);
        setAccounts(studentAccounts);
        break;

      case "teacher":
        getTeacherListAccountAPI(dispatch);
        setAccounts(teacherAccounts);
        break;

      case "ministry":
        getMinistryListAccountAPI(dispatch);
        setAccounts(ministryAccounts);
        break;
    }
  }, [tab, accounts]);


  useEffect(()=>{

  }, [studentAccounts, teacherAccounts, ministryAccounts])

  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50">
        <Header />
      </header>

      <div className="main-content w-full h-[88%] pt-4 bg-white/60 rounded-b-lg z-0">
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
                value={keyword}
                onChange={handleSearching}
                className="w-full py-2 px-10 border-gray-200 border outline-none rounded-lg bg-gray-100 focus:outline-fourth-blue peer"
                type="text"
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
            <span
            onClick={addAccountForm.onOpen}
            className="px-4 py-3 font-bold bg-gray-300 cursor-pointer text-sm rounded-lg text-gray-600 hover:bg-gray-400/60">
              Thêm tài khoản
            </span>
          </div>
          <div className="mt-4 h-[78%] overflow-y-auto w-full rounded-lg flex justify-center border border-gray-200">
            <TableAccount accounts={accounts} roles={tab} />
          </div>
        </div>
        
        <div className="">
          <ModalAddAccountForm
          setAccounts={setAccounts}
          setTab={setTab}
          isOpen={addAccountForm.isOpen}
          onClose={addAccountForm.onClose}
          />

        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
