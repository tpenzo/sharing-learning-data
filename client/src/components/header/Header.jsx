import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import headerLogo from "/assets/header-logo.png";

function Header() {
  const [keyword, setKeyword] = useState("");
  const [closeX, setCloseX] = useState(false);
  const [dropdown, setDropdown] = useState(false);
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
  return (
    <div className="h-full bg-white flex items-center justify-between">
      <div className="h-full bg-white flex items-center justify-start">
          <figure className="w-24 2xl:w-32 sm:scale-50 xl:scale-100">
            <img src={headerLogo} alt="logo" />
          </figure>
          <div className="flex flex-col justify-center">
            <span className="text-yellow-500 text-sm font-semibold">
              CTU SHARE
              <br />
            </span>
            <span className="text-primary-blue text-xs font-semibold">Chia sẻ dữ liệu học tập</span>
          </div>
        </div>
      <div className="xl:w-[50%] flex relative">
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
        <div className="absolute z-10 p-1 w-full top-14 left-0 bg-light-gray rounded-lg shadow-xl overflow-hidden invisible peer-focus:visible">
          <h4 className="mt-3 ml-3 font-bold">Tìm kiếm gần đây</h4>
          <ul className="mt-2">
            <li className="p-3 font-semibold rounded-lg hover:bg-bold-gray flex items-center justify-between cursor-pointer">
              <span>Profile</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-2 relative pr-5">
        <div className="text-right">
          <p className="font-semibold">Duong Anh Thuong</p>
          <span className="text-sm text-gray-400">Captain</span>
        </div>
        <figure className="relative">
          <img
            className="w-10 rounded-full"
            src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
            alt=""
          />
          <p
            className="absolute top-5 -right-2 h-6 rounded-full bg-white scale-75 cursor-pointer"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <box-icon name="down-arrow" type="solid" size="sm"></box-icon>
          </p>
        </figure>
        {dropdown && (
          <ul className="absolute z-[9999] bg-light-gray w-full top-12 left-0 rounded shadow-xl overflow-hidden">
            <Link to={"/profile"}>
              <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-between cursor-pointer">
                <span>Trang cá nhân</span>
                <box-icon name="cog"></box-icon>
              </li>
            </Link>
            <Link>
              <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-between cursor-pointer">
                <span>Nhắn tin</span>
              </li>
            </Link>
            <Link>
              <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-between cursor-pointer">
                <span>Đăng xuất</span>
                <box-icon name="log-out"></box-icon>
              </li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
