import React from "react";

function TeacherInfo(props) {
  const {teacherInfo} = props;
  return (
    <div className="teacher-info flex flex-col items-center w-full mr-6">
      <div className="teacher-avatar rounded-xl flex items-center">
      <img className="w-24 h-24 rounded-xl" src={teacherInfo?.urlAvatar} alt="avatar"/>
      </div>
      <div className="teacher-name">
        <span className="block text-center font-semibold text-base my-4">
          {teacherInfo?.fullName}
        </span>
      </div>
      <div className="info-description relative w-4/5 max-w-full text-center bg-white/80 rounded-xl shadow-md px-4 py-2">
        <span className="text-xs font-medium flex items-center text-gray-700 mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
        <box-icon color="#4b5563" name='envelope'></box-icon> 
          : {teacherInfo?.email}
        </span>
        <span className="text-xs flex font-medium items-center text-gray-700 mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
          <box-icon color="#4b5563" name="phone"></box-icon>: {teacherInfo?.phoneNumber}
        </span>
        <div className="absolute text-xs shadow-sm -top-2 text-center left-1/2 -translate-x-1/2 rounded-lg w-3/5 max-w-[75%] bg-cyan-50 text-cyan-300">
          Giảng viên chính
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
