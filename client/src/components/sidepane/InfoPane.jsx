import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import CreatePost from "../form/CreatePost";
import ModalInstance from "../modal/ModalInstance";
import ListOfPopularUser from "./ListOfPopularUser";
import PopularCoursesList from "./PopularCoursesList";
function InfoPane() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="absolute flex-col flex h-full max-h-full -z-10">
        <div className="w-full h-1/5 bg-inherit scale-90 2xl:scale-100">
          <div className="flex mx-auto bg-third-blue w-[90%] mt-10 2xl:mt-14 p-2 text-center text-white rounded-xl shadow-lg hover:bg-fourth-blue hover:shadow-lg cursor-pointer">
            <span className="inline-block w-1/4 flex-1 px-1 mt-2 text-lg font-semibold">
              <box-icon size="md" color="white" name="plus"></box-icon>
            </span>
            <div
              onClick={onOpen}
              className="w-3/4 font-semibold text-xl pt-3 2xl:-ml-20 -ml-10 mr-3"
            >
              Đăng bài
            </div>
          </div>
        </div>

        <div className="h-3/5 mt-6">
          <ListOfPopularUser />
        </div>
        <div className="self-end h-1/5 mb-6">
          <PopularCoursesList />
        </div>
      </div>
      <ModalInstance
        isOpen={isOpen}
        onClose={onClose}
        modalBody={<CreatePost onClose={onClose} />}
        modalName={"Tạo bài viết"}
      />
    </>
  );
}

export default InfoPane;
