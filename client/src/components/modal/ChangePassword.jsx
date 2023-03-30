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
import showToast from "../../Api/showToast";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup"
import { changePasswordAPI } from "../../Api/userAPI";

function ChangePassword(props) {
  const { isOpen, onOpen, onClose } = props;
  // const [password, setPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [isShowPassWord, setIsShowPassWord] = useState(false);
  const [isShowNewPassWord, setIsShowNewPassWord] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      retypeNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Vui lòng nhập mật khẩu hiện tại của bạn").min(8, "Mật khẩu cần tối thiểu 8 kí tự"),
      newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới").min(8, "Mật khẩu cần tối thiểu 8 kí tự"),
      retypeNewPassword: Yup.string()
        .required("Vui lòng nhập lại mật khẩu")
        .min(8, "Mật khẩu cần tối thiểu 8 kí tự")
        .oneOf([Yup.ref("newPassword"), null], "Bạn cần nhập lại mật khẩu giống với mật khẩu đã nhập"),
    }),
    onSubmit: () => {
      handleChangePassword()
    },
  });

  const { values, handleSubmit, handleChange, resetForm } = formik;
  const { password, newPassword, retypeNewPassword } = values;

  const handleChangePassword = async ()=>{
    setIsLoading(true)
    const submitData ={password, newPassword}
    changePasswordAPI(user._id, submitData).then((response)=>{
      setIsLoading(false)
      if(response.message==="successful"){
        onClose()
      }
      resetForm()
    })
    
    
  }

  useEffect(() => {
    resetForm();
    setIsShowNewPassWord(false);
    setIsShowPassWord(false);
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalContent>
          <form onSubmit={handleSubmit}>
        <ModalHeader>Đổi mật khẩu</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            <div className="relative">
              <span>Mật khẩu hiện tại</span>
              <input
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 pr-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                type={isShowPassWord ? "text" : "password"}
                autoComplete="off"
              />
              <i
                onClick={() => setIsShowPassWord(!isShowPassWord)}
                className="block cursor-pointer bg-inherit px-1 absolute top-9 right-2"
              >
                <box-icon
                  title={isShowPassWord ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  name={isShowPassWord ? "hide" : "show"}
                ></box-icon>
              </i>
              <div className="h-1">
                {formik.errors.password && formik.touched.password && (
                  <span className="text-[10px] ml-2 text-red-400">
                    {formik.errors.password}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 relative">
              <span>Mật khẩu mới</span>
              <input
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300  pr-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                type={isShowNewPassWord ? "text" : "password"}
                autoComplete="off"
              />
              <i
                onClick={() => setIsShowNewPassWord(!isShowNewPassWord)}
                className="block cursor-pointer bg-inherit px-1 absolute top-9 right-2"
              >
                <box-icon
                  title={isShowNewPassWord ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  name={isShowNewPassWord ? "hide" : "show"}
                ></box-icon>
              </i>
              <div className="h-1">
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <span className="text-[10px] ml-2 text-red-400">
                    {formik.errors.newPassword}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5">
              <span>Nhập lại mật khẩu mới</span>
              <input
                id="retypeNewPassword"
                name="retypeNewPassword"
                value={retypeNewPassword}
                onChange={handleChange}
                className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                type="password"
                autoComplete="off"
              />
              <div className="h-1">
                {formik.errors.retypeNewPassword &&
                  formik.touched.retypeNewPassword && (
                    <span className="text-[10px] ml-2 text-red-400">
                      {formik.errors.retypeNewPassword}
                    </span>
                  )}
              </div>
            </div>
        </ModalBody>

        <ModalFooter>
          <Button isLoading={isLoading} type="submit" colorScheme="blue" mr={3}>
            Đổi mật khẩu
          </Button>
          <Button onClick={onClose}>Huỷ</Button>
        </ModalFooter>
          </form>
      </ModalContent>
    </Modal>
  );
}

export default ChangePassword;
