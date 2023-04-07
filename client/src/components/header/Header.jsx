import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import headerLogo from "/assets/header-logo.png";
import { logoutAPI } from "../../Api/authAPI.js";
import { searchAPI } from "../../Api/userAPI.js";
import SearchResult from "./SearchResult.jsx";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Avatar, Wrap } from "@chakra-ui/react";

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {idCourse} = useParams()

  const [keyword, setKeyword] = useState("");
  const [closeX, setCloseX] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const typingTimeoutRef = useRef(null);

  const [searchResult, setSearchResult] = useState([]);

  const handleSearching = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      if (value) {
        // Call API
        setSearchResult(await searchAPI(value));
      } else {
        setSearchResult([]);
      }
    }, 500);
  };

  // Click outside input search and search result
  const ref = useDetectClickOutside({ onTriggered: () => setKeyword("") });

  useEffect(() => {
    if (keyword.length) {
      setCloseX(true);
    } else {
      setCloseX(false);
    }
  }, [keyword]);


  const handleLogout = async () => {
    await logoutAPI(dispatch);
  };
  return (
    <div className="h-full bg-white flex items-center justify-between">
      <div className="h-full bg-white flex items-center justify-start">
        <Link to="/">
          <figure className="w-24 sm:scale-50 xl:scale-100">
            <img src={headerLogo} alt="logo" />
          </figure>
        </Link>
        <div className="flex flex-col justify-center">
          <span className="text-yellow-500 text-sm font-semibold">
            CTU SHARE
            <br />
          </span>
          <span className="text-primary-blue text-xs font-semibold">
            Chia sẻ dữ liệu học tập
          </span>
        </div>
      </div>
      {
        (auth?.user.role==="student" || auth?.user.role==="teacher") &&
        <div className="xl:w-[50%] flex relative">
        <span className="cursor-pointer pl-1 absolute top-2 xl:top-3 left-2">
          <box-icon name="search-alt-2" color="gray"></box-icon>
        </span>
        <input
          value={keyword}
          onChange={handleSearching}
          className="w-full py-2 xl:py-3 px-10 outline-none rounded-lg bg-gray-100 focus:outline-primary-blue peer"
          type="text"
          placeholder="Tìm kiếm..."
        />
        {closeX && (
          <span
            className="cursor-pointer absolute top-2 xl:top-3 right-2"
            onClick={() => {
              setKeyword("");
              setSearchResult([]);
            }}
          >
            <box-icon name="x" color="gray"></box-icon>
          </span>
        )}
        <div
          ref={ref}
          className="absolute z-10 w-full top-14 left-0 bg-light-gray rounded-lg shadow-xl overflow-hidden peer-focus:visible"
        >
          {keyword && <SearchResult searchResult={searchResult} />}
        </div>
      </div>}
      {/* user */}
      <div className="flex items-center gap-2 relative pr-5">
        <div className="text-right">
          <p className="font-semibold text-sm">{auth.user.fullName}</p>
          <span className="text-xs text-gray-400">{auth.user.role}</span>
        </div>
        <figure className="relative">
          <Wrap>
            <Avatar size='md' src={auth.user.urlAvatar}></Avatar>
          </Wrap>
          <p
            className="absolute top-7 -right-2 h-6 rounded-full bg-white scale-[70%] cursor-pointer"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <box-icon name="down-arrow" type="solid" size="sm"></box-icon>
          </p>
        </figure>
        {dropdown && (
          <ul className="absolute z-[9999] bg-white w-44 top-14 -right-5 rounded-xl shadow-xl border overflow-hidden">
            {
              (auth?.user.role==="student" || auth?.user.role==="teacher") && 
              <>
              <Link to={`/profile/${auth.user._id}`}>
                <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-start cursor-pointer">
                  <box-icon name="user"></box-icon>
                  <span className="ml-2">Trang cá nhân</span>
                </li>
              </Link>
              <Link to={"/chat"}>
                <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-start cursor-pointer">
                  <box-icon name="message-square-dots"></box-icon>
                  <span className="ml-2">Nhắn tin</span>
                </li>
              </Link></>
            }
            {
              (idCourse && auth?.user.role==="teacher") &&
              <Link to={`/courses/${idCourse}/manage`}>
                <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-start cursor-pointer">
                  <box-icon name="message-square-dots"></box-icon>
                  <span className="ml-2">Quản lý nhóm học</span>
                </li>
              </Link>
            }
            <li
              className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-start cursor-pointer"
              onClick={handleLogout}
            >
              <box-icon name="log-out"></box-icon>
              <span className="ml-2">Đăng xuất</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
