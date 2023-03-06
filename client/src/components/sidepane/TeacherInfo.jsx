import React from "react";

function TeacherInfo() {
  return (
    <div className="teacher-info flex flex-col items-center w-full mr-6">
      <div className="teacher-avatar rounded-xl w-20 h-20 bg-gray-500">
        {/* <img src="" alt="teacher-avatar" /> */}
      </div>
      <div className="teacher-name">
        <span className="block text-center font-semibold text-base my-4">
          Nguyễn Văn Giảng Viên
        </span>
      </div>
      <div className="info-description relative w-4/5 max-w-full text-center bg-white/80 rounded-xl shadow-md px-4 py-2">
        <span className="text-xs font-medium flex items-center text-gray-700 mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
        <box-icon color="#4b5563" name='envelope'></box-icon> 
          : Example@ctu.edu.vn
        </span>
        <span className="text-xs flex font-medium items-center text-gray-700 mt-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
          <box-icon color="#4b5563" name="phone"></box-icon>: 0968888888
        </span>
        <div className="absolute text-xs shadow-sm -top-2 text-center left-1/2 -translate-x-1/2 rounded-lg w-3/5 max-w-[75%] bg-cyan-50 text-cyan-300">
          Giảng viên chính
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
