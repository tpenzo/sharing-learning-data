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
function EditInfo(props) {
  const [fullName, setFullName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [role, setRole] = useState("");

  const { isOpen, onClose } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="scale"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chỉnh Sửa Thông Tin</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <div className="">
            <div className="mt-4 w-1/2">
            <span>Mã số sinh viên</span>
            <input
                className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                type="text"
            />
            </div>
             <div className="flex justify-center gap-2">
             <div className="mt-4 w-1/2">
                <span>Họ và tên</span>
                <input
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  type="text"
                />
              </div>
            <div className="mt-4 w-1/2">
                <span>Mật Khẩu</span>
                <input
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  type="text"
                />
            </div>
             </div>
            <div className="mt-4">
              <span>Giới tính</span>
              <div className="flex justify-start gap-3 mt-1">
                <div class="flex items-center mb-4">
                  <input
                    id="male"
                    type="radio"
                    value="male"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="male"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nam
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="female"
                    type="radio"
                    value="female"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="female"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nữ
                  </label>
                </div>
              </div>
            </div>
            <div className="">
                <span>Số Điện Thoại</span>
                <input
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  type="text"
                />
            </div>
            <div className="mt-4">
                <span>Địa chỉ</span>
                <input
                  className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  type="text"
                />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Cập nhật
          </Button>
          <Button onClick={onClose}>Huỷ</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditInfo;
