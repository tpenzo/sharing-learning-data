import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import TableAccount from "../components/table/account/TableAccount";

function ManageAccount() {
  const [tab, setTab] = useState("student");
  const [keyword, setKeyword] = useState("");
  const [closeX, setCloseX] = useState(false);
  const typingTimeoutRef = useRef(null);
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
  useEffect(() => {
    if (keyword.length) {
      setCloseX(true);
    } else {
      setCloseX(false);
    }
  }, [keyword]);
  const handleChangeTab = (e) => {
    setTab(e.target.id);
  };

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      code: "B1906585",
      fullName: "Dương Anh Thương",
      typeAccount: "student",
    },
    {
      id: 2,
      code: "B1906475",
      fullName: "Đặng Hồ Trường Phúc",
      typeAccount: "student",
    },
    {
      id: 3,
      code: "B1906476",
      fullName: "Hồ Anh Vinh",
      typeAccount: "student",
    },
    {
      id: 4,
      code: "12843423",
      fullName: "Nguyễn Anh Thầy",
      typeAccount: "teacher",
    },
    {
      id: 5,
      code: "42343244",
      fullName: "Trần Văn Giáo Vụ",
      typeAccount: "ministry",
    },
    {
      id: 6,
      code: "B1906111",
      fullName: "Dương Em Thương",
      typeAccount: "student",
    },
    {
      id: 8,
      code: "12731233",
      fullName: "Thầy Giáo 2",
      typeAccount: "teacher",
    },
    {
      id: 12,
      code: "23123123",
      fullName: "Trần Trần Giảng Viên",
      typeAccount: "teacher",
    },
  ]);
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
            <TableAccount accounts={accounts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
