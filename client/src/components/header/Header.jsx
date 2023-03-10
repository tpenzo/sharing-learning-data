import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import headerLogo from "/assets/header-logo.png";
import { logoutAPI } from "../../Api/authAPI.js";

function Header() {

   const auth = useSelector(state => state.auth)
   const dispatch = useDispatch()

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

   const handleLogout = async () => {
      await logoutAPI(dispatch)
   }
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
               <p className="font-semibold text-sm">{auth.user.fullName}</p>
               <span className="text-xs text-gray-400">{auth.user.role}</span>
            </div>
            <figure className="relative">
               <img
                  className="w-10 rounded-full"
                  src="https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                  alt=""
               />
               <p
                  className="absolute top-6 -right-2 h-6 rounded-full bg-white scale-[70%] cursor-pointer"
                  onClick={() => {
                     setDropdown(!dropdown);
                  }}
               >
                  <box-icon name="down-arrow" type="solid" size="sm"></box-icon>
               </p>
            </figure>
            {dropdown && (
               <ul className="absolute z-[9999] bg-white w-44 top-14 left-0 rounded-xl shadow-xl border overflow-hidden">
                  <Link to={`/profile/${auth.user._id}`}>
                     <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-start cursor-pointer">
                        <box-icon name="user"></box-icon>
                        <span className="ml-2">Trang cá nhân</span>
                     </li>
                  </Link>
                  <Link to={"/chat"}>
                     <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-start cursor-pointer">
                        <box-icon name='message-square-dots'></box-icon>
                        <span className="ml-2">Nhắn tin</span>
                     </li>
                  </Link>
                  <li className="p-2 font-semibold hover:bg-bold-gray flex items-center justify-start cursor-pointer"
                     onClick={handleLogout}>
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
