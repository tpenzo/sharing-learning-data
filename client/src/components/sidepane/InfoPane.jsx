import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import FormPost from "../form/FormPost";
import ModalInstance from "../modal/ModalInstance";
import ListOfUser from "./ListOfUser";
import PopularCoursesList from "./PopularCoursesList";
import axiosClient from "../../Api/axiosClient";
import { useSelector } from "react-redux";
function InfoPane() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [topAuthors, setTopAuthors] = useState([])

  const { postList } = useSelector((state) => state.post);

  const fetchTopAuthors = async () => {
    try {
      const res = await axiosClient.get("/api/user/topauthors")
      setTopAuthors(res.data)
    } catch (error) {
      console.log("error")
    }
  }

  useEffect(() => {
    fetchTopAuthors()
  }, [postList])

  return (
    <>
      <div className="flex-col flex h-full overflow-y-auto">
        {/* post content */}
        <div className="w-full h-1/5 bg-inherit -mt-6">
          <div
            onClick={onOpen}
            className="flex flex-row items-center justify-center mx-auto bg-third-blue w-[80%] mt-10 2xl:mt-14 p-2 2xl:p-3 text-center text-white rounded-xl hover:bg-fourth-blue cursor-pointer"
          >
            <span className=" translate-y-1">
              <box-icon size="sm" color="white" name="plus"></box-icon>
            </span>
            <span className="block font-semibold text-base pb-1 pr-2 ml-1 mt-2">
              Đăng bài
            </span>
          </div>
        </div>

        <div className="mt-4">
          <ListOfUser userList={topAuthors} title={"Người dùng nổi bật"} />
        </div>
        <div className="mt-5 w-full mb-1 mx-auto px-2">
          <PopularCoursesList />
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
