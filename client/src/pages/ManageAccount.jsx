import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import TableAccount from "../components/table/account/TableAccount";
import { useSelector, useDispatch } from "react-redux";
import { getTeacherListAccountAPI, getStudentListAccountAPI, getMinistryListAccountAPI } from "../Api/manageAPI";

function ManageAccount() {
  const [tab, setTab] = useState("student");
  const [keyword, setKeyword] = useState("");
  const [closeX, setCloseX] = useState(false);
  const typingTimeoutRef = useRef(null);
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
        console.log(accounts);
        break;

      case "teacher":
        getTeacherListAccountAPI(dispatch);
        setAccounts(teacherAccounts);
        console.log(accounts);
        break;

      case "ministry":
        getMinistryListAccountAPI(dispatch);
        setAccounts(ministryAccounts);
        console.log(accounts);
        break;
    }
  }, [tab]);


  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50">
        <Header />
      </header>

      <div className="main-content w-full h-[90%] pt-4 bg-white/60 rounded-b-lg z-0">
        <div className="w-4/5 mx-auto h-full">
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
          <div className="pt-10 flex justify-between items-center">
            <h3 className="text-lg font-bold">Danh sách tài khoản</h3>
            <div className="flex relative">
              <span className="cursor-pointer pl-1 absolute top-2 xl:top-3 left-2">
                <box-icon name="search-alt-2" color="gray"></box-icon>
              </span>
              <input
                value={keyword}
                onChange={handleSearching}
                className="w-full py-2 xl:py-3 px-10 outline-none rounded-lg bg-gray-100 focus:outline-primary-blue peer"
                type="text"
                placeholder="Tìm kiếm"
              />
              {closeX && (
                <span
                  className="cursor-pointer absolute top-2 xl:top-3 right-2"
                  onClick={() => {
                    setKeyword("");
                  }}
                >
                  <box-icon name="x" color="gray"></box-icon>
                </span>
              )}
            </div>
            <span className="px-3 py-2 font-bold bg-gray-300 cursor-pointer rounded hover:bg-gray-400/60">
              Thêm tài khoản
            </span>
          </div>
          <div className="mt-4 h-3/4 overflow-y-auto">
            <TableAccount accounts={accounts} roles={tab} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
