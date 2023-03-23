import React from "react";
import { Link } from "react-router-dom";
import Pic401 from "/assets/401-error.png";
export default function Unauthorized() {
  return (
    <div className="container h-screen bg-inherit">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-start items-start mt-16">
          <p className="text-5xl py-7 text-cyan-400 mb-4 font-extrabold">
            Không có quyền!
          </p>
          <p className="font-extralight text-xl text-gray-800 ">
            Oops! Bạn không có đủ quyền để truy cập vào địa chỉ này.
            <br /> Trở về trang chủ bằng cách chọn vào nút bên dưới.
          </p>
          <Link to="/">
            <button
              type="button"
              className="text-white font-semibold text-lg mt-7 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg px-10 py-2.5 text-center mr-2 mb-2"
            >
              Trang chủ
            </button>
          </Link>
        </div>
        <div className="w-3/5 h-auto">
          <img src={Pic401} alt="err-pic" />
        </div>
      </div>
    </div>
  );
}
