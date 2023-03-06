import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import CreatePost from "../form/CreatePost";
import ModalInstance from "../modal/ModalInstance";
import ListOfUser from "./ListOfUser";
import PopularCoursesList from "./PopularCoursesList";
function InfoPane() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex-col flex h-full overflow-y-auto">
        {/* post content */}
        <div className="w-full h-[13%] 2xl:h-1/5 bg-inherit scale-[85%] 2xl:scale-100">
          <div
            onClick={onOpen}
            className="flex flex-row items-center justify-center mx-auto bg-third-blue w-[80%] mt-10 2xl:mt-14 p-3 text-center text-white rounded-xl shadow-lg hover:bg-fourth-blue hover:shadow-lg cursor-pointer"
          >
            <span className="block px-1 font-semibold">
              <box-icon size="md" color="white" name="plus"></box-icon>
            </span>
            <span className="block font-semibold text-base pb-1 ml-1 mr-3">
              Đăng bài
            </span>
          </div>
        </div>

        <div className="mt-6 -ml-4">
          <ListOfUser />
        </div>
        <div className="mt-5 mb-1 mr-3">
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
