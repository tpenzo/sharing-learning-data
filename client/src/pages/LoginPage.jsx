import React, { useState } from "react";
import "boxicons";
import { loginAPI } from "../Api/authAPI.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "/assets/header-logo.png";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [isShowPassWord, setIsShowPassWord] = useState(false);

  //email = formik.values.email
  //password = formik.values.password
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Định dạng Email không đúng")
        .required("Không được để trống"),
      password: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .required("Không được để trống"),
    }),
  onSubmit: ()=>{
    handleLogin()
  }
  });

  const handleLogin = () => {
    // [POST] api/auth/login
    loginAPI(formik.values.email, formik.values.password, dispatch).then(
      (response)=>{
        if(response){
          switch(response?.role){
            case"ministry":
             navigate("/ministry/manage")
            break;
            case"admin":
              navigate("/admin/manage")
            break;
            case"student":
               navigate("/")
            break;
            case"teacher":
               navigate("/")
            break;
          }
        }
      }
    );
  };

  return (
    <div className="container h-screen w-4/5 mx-auto flex flex-col justify-center items-center">
      <header className="header hidden xl:block fixed top-0 w-full h-[12%] rounded-t-lg z-50 bg-white shadow rounded-lg">
        <div className="h-full bg-white flex items-center justify-start">
          <figure className="w-24 2xl:w-32 sm:scale-50 xl:scale-100">
            <img src={logo} alt="logo" />
          </figure>
          <div className="flex flex-col justify-center">
            <span className="text-yellow-500 font-semibold">
              CTU SHARE
              <br />
            </span>
            <span className="text-primary-blue font-semibold">Chia sẻ dữ liệu học tập</span>
          </div>
        </div>
      </header>
      <div className="h-4/5 xl:h-3/5 w-3/5 xl:w-[80%] flex flex-row justify-center items-center bg-white rounded-xl px-8 py-10 shadow-2xl border-gray-200 border-[1px]">
        <div className="login-form flex flex-col w-full xl:w-[50%] bg-white rounded-xl">
          <div className="text-center text-2xl md:text-3xl pt-4 2xl:pt-0">
            Đăng nhập
          </div>
          <div className="form-container p-1 xl:p-5  border-gray-400">
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="input-field mt-5">
                <label
                  htmlFor="email"
                  className="ml-1 block mb-2 text-base font-medium text-gray-900 dark:text-white "
                >
                  E-mail
                </label>
                <input
                autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-700 block w-full p-2.5 "
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@ctu.edu.vn"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                <div className="h-1">
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-xs text-red-400 ml-2">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="input-field mt-3 relative">
                <label
                  htmlFor="password"
                  className="ml-1 block mb-2 text-base font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-700 block w-full p-2.5"
                  type={isShowPassWord ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder={isShowPassWord ? "Mật khẩu" : "•••••••••"}
                  autoComplete=""
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <i
                  onClick={() => setIsShowPassWord(!isShowPassWord)}
                  className="block cursor-pointer bg-inherit px-1 absolute top-10 right-2"
                >
                  <box-icon
                    title={isShowPassWord ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    name={isShowPassWord ? "hide" : "show"}
                  ></box-icon>
                </i>
                <div className="h-1">
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-xs text-red-400 ml-2">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-8 text-white bg-second-blue hover:bg-third-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center "
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
        <div className="illustration-pic hidden xl:inline-block md:w-[55%] scale-[77%] my-auto">
          <div className="w-full 2xl:translate-y-5">
            <img src="/assets/login-illustrate.png" alt="login-illu" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
