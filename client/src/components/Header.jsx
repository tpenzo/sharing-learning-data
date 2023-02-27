import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../public/assets/header-logo.png";

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
    <div className="xl:max-h-18 bg-light-gray flex items-center justify-between">
      <figure className="w-32">
        <Link to={"/"}>
          <img src={headerLogo} alt="" />
        </Link>
      </figure>
      <div className="xl:w-[50%] flex relative">
        <span className="cursor-pointer absolute top-2 left-2">
          <box-icon name="search-alt-2" color="gray"></box-icon>
        </span>
        <input
          value={keyword}
          onChange={handleSearching}
          className="w-full  py-2 px-10 outline-none rounded-lg bg-bold-gray focus:outline-primary-blue peer"
          type="text"
          placeholder="vd:CT242,CT559"
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
        <div className="absolute z-10 p-1 w-full top-12 left-0 bg-light-gray rounded-lg shadow-xl overflow-hidden invisible peer-focus:visible">
          <h4 className="mt-2 ml-3 font-bold">Tìm kiếm gần đây</h4>
          <ul className="mt-2">
            <li className="p-3 font-semibold rounded-lg hover:bg-bold-gray flex items-center justify-between cursor-pointer">
              <span>Profile</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-2 relative">
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
          <ul className="absolute z-10 bg-light-gray w-full top-12 left-0 rounded shadow-xl overflow-hidden">
            <Link to={"/profile"}>
              <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-between cursor-pointer">
                <span>Profile</span>
                <box-icon name="cog"></box-icon>
              </li>
            </Link>
            <Link>
              <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-between cursor-pointer">
                <span>Profile</span>
              </li>
            </Link>
            <Link>
              <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-between cursor-pointer">
                <span>Logout</span>
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
