import React from "react";
import ListOfUser from "./ListOfUser";
import TeacherInfo from "./teacherInfo";
function InfoPane() {
  return (
    <div className="absolute flex-col flex h-full max-h-full w-full">
      <div className="w-full h-1/6 bg-inherit scale-90 2xl:scale-100">
        <div className="flex mx-auto bg-third-blue w-[90%] mt-10 2xl:mt-14 p-2 text-center text-white rounded-xl shadow-lg hover:bg-fourth-blue hover:shadow-lg cursor-pointer">
          <span className="inline-block w-1/4 flex-1 px-1 mt-2 text-lg font-semibold">
            <box-icon size="md" color="white" name="plus"></box-icon>
          </span>
        <div className="w-3/4 font-semibold text-xl pt-3 2xl:-ml-20 -ml-10 mr-3">Đăng bài</div>
        </div>
      </div>

      <div className="h-2/6 mt-6">

        <TeacherInfo />
      </div>
      <div className="h-1/2 my-4">
        <ListOfUser />
      </div>
    </div>
  );
}

export default InfoPane;
