import React, { useState } from "react";
import "boxicons";
import { loginAPI } from '../Api/authAPI.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isShowPassWord, setIsShowPassWord] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginAPI(email, password, dispatch) // [POST] api/auth/login
    navigate('/')
  }
  

  return (
    <div className="container w-[85%] mx-auto mb-6 xl:mb-[6.5rem] mt-16 sm:mt-20 xl:mt-24 md:w-[60%] 2xl:mt-48 2xl:w-[50%] flex-row justify-center items-center rounded-xl px-12 py-10 shadow-2xl  bg-white border-gray-200 border-[1px]">
      <div className="login-form w-full xl:w-[45%] bg-white rounded-xl inline-block 2xl:-mt-48">
        <div className="text-center text-2xl md:text-3xl pt-4 2xl:pt-0">Đăng nhập</div>
        <div className="form-container p-1 xl:p-5  border-gray-400">
          <form action="" onSubmit={() => {handleLogin()}}>

            <div className="input-field mt-5">
              <label
                htmlFor="email"
                className="ml-1 block mb-2 text-base font-medium text-gray-900 dark:text-white "
              >
                E-mail
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="email"
                name="email"
                id="email"
                placeholder="example@ctu.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field mt-5 relative">
              <label
                htmlFor="password"
                className="ml-1 block mb-2 text-base font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type={isShowPassWord ? "text" : "password"}
                name="password"
                id="password"
                placeholder={isShowPassWord ? "Mật khẩu" : "•••••••••"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                onClick={() => setIsShowPassWord(!isShowPassWord)}
                className="block cursor-pointer bg-gray-50 px-1 absolute top-10 right-2">
                <box-icon
                  title={isShowPassWord ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  name={isShowPassWord ? "hide" : "show"}
                ></box-icon>
              </i>
            </div>
            <button
              type="submit"
              className="w-full mt-8 text-white bg-second-blue hover:bg-third-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
      <div className="illustration-pic hidden xl:inline-block md:w-[55%] my-auto">
        <div className="w-full 2xl:translate-y-5">
          <img src="/assets/login-illustrate.png" alt="login-illu" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
