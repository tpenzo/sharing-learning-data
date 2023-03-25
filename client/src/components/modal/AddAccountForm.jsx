import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createAccountAPI, updateAccountAPI } from "../../Api/manageAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentListAccountAPI,
  getMinistryListAccountAPI,
  getTeacherListAccountAPI,
} from "../../Api/manageAPI";
function ModalAddAccountForm(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const studentAccounts = useSelector((state) => state.manage.studentList);
  const teacherAccounts = useSelector((state) => state.manage.teacherList);
  const ministryAccounts = useSelector((state) => state.manage.ministryList);
  const formik = useFormik({
    initialValues: {
      role: "",
      email: "",
      fullName: "",
      code: "",
      password: "",
      gender: "",
      phoneNumber: "",
      address: "",
      classId: "",
      major: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("Vui lòng chọn quyền tài khoản"),
      email: Yup.string()
        .email("Định dạng Email không đúng")
        .required("Vui lòng nhập Email"),
      code: Yup.string().required("Không được để trống"),
      gender: Yup.string().required("Vui lòng chọn giới tính"),
      fullName: Yup.string().required("Vui lòng điền tên người dùng"),
      password: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: () => {
      handleSubmitAccount();
    },
  });

  const { values, onSubmit, handleSubmit } = formik;
  const {
    role,
    email,
    fullName,
    code,
    password,
    gender,
    phoneNumber,
    address,
    classId,
    major,
  } = values;
  const { isOpen, onClose, setAccounts, account, action, title } = props;

  //handle add or modify account to db
  const handleSubmitAccount = async () => {
    let submitData = {
      email,
      fullName,
      password,
      gender,
      phoneNumber,
      address,
    };
    //if data valid
    if (formik.isValid) {
      if (role === "student") {
        const specificStudentData = {
          studentCode: code.toUpperCase(),
          major,
          class: classId,
        };
        const SubmitStudentData = { ...submitData, ...specificStudentData };
        if (action === "create") {
          setIsLoading(true)
          await createAccountAPI(role, SubmitStudentData);
          setIsLoading(false)
        } else if (action === "modify") {
          setIsLoading(true)
          await updateAccountAPI({...SubmitStudentData, _id: account._id});
          setIsLoading(false)
        }
        //reload studentList
        await getStudentListAccountAPI(dispatch);
        setAccounts(studentAccounts);
      } else {
        const specificTeacherData = {
          teacherCode: code.toUpperCase(),
        };
        const SubmitTeacherData = { ...submitData, ...specificTeacherData };
        if (action === "create") {
          setIsLoading(true)
          await createAccountAPI(role, SubmitTeacherData);
          setIsLoading(false)
        } else if (action === "modify") {
          setIsLoading(true)
          await updateAccountAPI({...SubmitTeacherData, _id: account._id});
          setIsLoading(false)
        }

        //reload ministryList and teacherList
        if (role === "teacher") {
          await getTeacherListAccountAPI(dispatch);
          setAccounts(teacherAccounts);
        }
        if (role === "ministry") {
          await getMinistryListAccountAPI(dispatch);
          setAccounts(ministryAccounts);
        }
      }
      formik.resetForm();
      onClose();
    }
  };

  //set values for modify func
  useEffect(() => {
    if (action === "modify" || action === "view") {
      formik.setValues({
        ...account,
        code: account?.studentCode || account?.teacherCode || "",
        classId: account?.class || "",
      });
    }
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="scale"
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{action==="view" ? "Thông tin chi tiết" : title}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit} className="container-modal">
          <ModalBody pb={6}>
            <div className="role-email flex justify-center gap-2">
              <div className="w-2/5">
                <label htmlFor="role">Loại Tài Khoản*</label>
                <select
                  value={role}
                  onChange={formik.handleChange}
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                  placeholder="Loại tài khoản"
                  name="role"
                  id="role"
                  disabled={action === "modify" || action==="view"}
                >
                  <option value="" defaultValue={""}>
                    Chọn Loại Tài Khoản
                  </option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="ministry">Ministry</option>
                </select>
                <div className="h-1">
                  {formik.errors.role && formik.touched.role && (
                    <p className="text-xs text-red-400 ml-2">
                      {formik.errors.role}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-3/5">
                <span>Email*</span>
                <input
                  id="email"
                  value={email}
                  onChange={formik.handleChange}
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                  type="text"
                  disabled={role === "" || action==="modify" || action==="view"}
                />
                <div className="h-1">
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-xs text-red-400 ml-2">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="code-name flex justify-center items-center gap-2">
              <div className="mt-4 w-2/5">
                <span>
                  Mã số {role === "student" ? "sinh viên*" : "cán bộ*"}
                </span>
                <input
                  id="code"
                  value={code}
                  onChange={formik.handleChange}
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                  type="text"
                  disabled={role === "" || action==="modify" || action==="view"}
                />
                <div className="h-1">
                  {formik.errors.code && formik.touched.code && (
                    <p className="text-xs text-red-400 ml-2">
                      {formik.errors.code}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 w-3/5">
                <span>Họ và tên*</span>
                <input
                  id="fullName"
                  value={fullName}
                  onChange={formik.handleChange}
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                  type="text"
                  disabled={role === "" || action==="view"}
                />
                <div className="h-1">
                  {formik.errors.fullName && formik.touched.fullName && (
                    <p className="text-xs text-red-400 ml-2">
                      {formik.errors.fullName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`student-class-major flex justify-center items-center gap-2 ${
                role === "student" ? "block" : "hidden"
              }`}
            >
              <div className="mt-4 w-2/5">
                <span>Mã lớp</span>
                <input
                  id="classId"
                  value={classId}
                  onChange={formik.handleChange}
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                  type="text"
                  autoComplete="off"
                  disabled={role === "" || action==="view"}
                />
              </div>
              <div className="mt-4 w-3/5">
                <span>Ngành</span>
                <input
                  id="major"
                  value={major}
                  onChange={formik.handleChange}
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                  type="text"
                  autoComplete="off"
                  disabled={role === "" || action==="view"}
                />
              </div>
            </div>
            <div className="mt-4">
              <span>Mật Khẩu*</span>
              <input
                id="password"
                value={password}
                onChange={formik.handleChange}
                className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                type="text"
                disabled={role === "" || action==="view"}
              />
              <div className="h-1">
                {formik.errors.password && formik.touched.password && (
                  <p className="text-xs text-red-400 ml-2">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <span>Giới tính*</span>
              {formik.errors.gender && formik.touched.gender && (
                <span className="text-xs text-red-400 ml-2">
                  {formik.errors.gender}
                </span>
              )}
              <div
                id="gender"
                onChange={formik.handleChange}
                className="flex justify-start gap-3 mt-1"
              >
                <div className="flex items-center mb-4">
                  <input
                    id="male"
                    type="radio"
                    value="male"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={role === "" || action==="view"}
                    defaultChecked={gender === "male" || gender==="nam"}
                  />
                  <label
                    htmlFor="male"
                    className="ml-2 mb-[2px] text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nam
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="female"
                    type="radio"
                    value="female"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={role === "" || action==="view"}
                    defaultChecked={gender === "female" || gender==="nữ"}
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 mb-[2px] text-sm font-medium text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    Nữ
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              <span>Số Điện Thoại</span>
              <input
                id="phoneNumber"
                value={phoneNumber}
                onChange={formik.handleChange}
                className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                type="text"
                disabled={role === "" || action==="view"}
              />
            </div>
            <div className="mt-4">
              <span>Địa chỉ</span>
              <input
                id="address"
                value={address}
                onChange={formik.handleChange}
                className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed"
                type="text"
                disabled={role === "" || action==="view"}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <span className={`${action==="view" ? "hidden" : ""}`}>
            <Button isLoading={isLoading} type="submit" colorScheme="blue" mr={3}>
              {action === "modify" ? "Cập nhật" : "Thêm tài khoản"}
            </Button>
            </span>
            <Button onClick={onClose}>Huỷ</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ModalAddAccountForm;
