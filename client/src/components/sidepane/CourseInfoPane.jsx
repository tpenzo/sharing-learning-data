import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import ListOfUser from "./ListOfUser";
import TeacherInfo from "./teacherInfo";
import ModalInstance from "../modal/ModalInstance";
import FormPost from "../form/FormPost";
function InfoPane(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { course } = props;
  return (
    <>
      <div className="absolute flex-col flex h-full max-h-full w-full">
        <div className="w-full bg-inherit -mt-6">
          <div
            onClick={onOpen}
            className="flex flex-row items-center justify-center mx-auto bg-third-blue w-[80%] mt-10 2xl:mt-14 p-2 2xl:p-3 text-center text-white rounded-xl hover:bg-fourth-blue cursor-pointer"
          >
            <span className=" translate-y-1">
              <box-icon size="sm" color="white" name="plus"></box-icon>
            </span>
            <span className="block font-semibold text-base pb-1 pr-2 ml-1 mt-2">Đăng bài</span>
          </div>
        </div>

        <div className=" mt-8">
          <TeacherInfo teacherInfo={course?.teacher} idCourse={course._id} />
        </div>
        <div className="my-4 overflow-hidden">
          <ListOfUser title={"Danh sách sinh viên"} userList={course.studentList} />
        </div>
      </div>
      <ModalInstance
        isOpen={isOpen}
        onClose={onClose}
        modalBody={<FormPost onClose={onClose} />}
        modalName={"Tạo bài viết"}
      />
    </>
  );
}

export default InfoPane;
