import React, {useEffect, useRef, useState} from "react";
import { useDisclosure } from "@chakra-ui/react";
import ModalAddStudent from "../modal/ModalAddStudent";
import ShowDialog from "../dialog/ShowDialog";

function StudentList(props) {
  const addStudentModal = useDisclosure();
  const showDialogDelete = useDisclosure();
  const requiredRemove = useRef({});
  const {setStudentList, studentList} = props;
  const [filterResultList, setFilterResultList] = useState(studentList)
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = ()=>{
    var filterResult = [...studentList]
    filterResult = filterResult.filter((item)=>{
      //filter base on name and studentCode
       return JSON.stringify(Object.values(item)[2]).toLowerCase().includes(searchKey.trim().toLowerCase()) 
       || JSON.stringify(Object.values(item)[10]).toLowerCase().includes(searchKey.trim().toLowerCase())
    } )
    setFilterResultList(filterResult.length===0 ? studentList : filterResult);
  }

  useEffect(()=>{
    handleSearch()
  }, [searchKey])

  useEffect(()=>{
    setFilterResultList(studentList)
  }, [])

  useEffect(()=>{
    setFilterResultList(studentList)
  }, [studentList])

const setRemoveStudent = (student)=>{
  requiredRemove.current = student
  showDialogDelete.onOpen();
}

  return (
    <div className="table-container max-h-max w-full">
      <div className="uppercase text-xl my-8 text-center font-semibold">
        Danh Sách Sinh Viên
      </div>

      {/* tool bar (search, add) */}
      <div className="">
        <div className="pb-4 bg-white flex items-center justify-between">
          <label htmlFor="table-search" className="sr-only">
            Tìm kiếm
          </label>
          <div className="relative ml-2 mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <box-icon color="gray" name="search"></box-icon>
            </div>
            <input
              value={searchKey}
              onChange={(e)=>{
                setSearchKey(e.target.value)
              }}
              type="text"
              id="searchKey"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Tìm kiếm"
            />
          </div>
          <div className="pr-3 ">
            <button onClick={addStudentModal.onOpen} className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg py-1 px-2 mr-2 outline-none ">
              <span className="translate-y-1">
                <box-icon name="plus-circle" color="white"></box-icon>
              </span>
              <span className="ml-1 text-sm">Thêm sinh viên</span>
            </button>
          </div>
        </div>

        {/* table container */}
        <div className=" max-h-full h-[350px] 2xl:h-[520px] overflow-y-auto ">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs rounded-lg text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 sticky top-0">
                  STT
                </th>
                <th scope="col" className="px-6 py-3 sticky top-0">
                  MSSV
                </th>
                <th scope="col" className="px-6 py-3 sticky top-0">
                  Họ Tên
                </th>
                <th scope="col" className="px-3 py-3 sticky top-0"></th>
              </tr>
            </thead>
            <tbody className="">
            {
              studentList && studentList.length > 0 && 
              filterResultList.map((student, index)=>{
                return (
                  <tr key={index + 1} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 ">{student?.studentCode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student?.fullName}</td>
                <td className="px-3 py-4">
                  <span
                    onClick={()=>{setRemoveStudent(student)}}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer select-none"
                  >
                    Xoá
                  </span>
                </td>
              </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
      <ModalAddStudent
      studentList={studentList}
      setStudentList={setStudentList}
      isOpen={addStudentModal.isOpen}
      onClose={addStudentModal.onClose}
      />

      <ShowDialog
      action={"removeStudent"}
      studentList={studentList}
      setStudentList={setStudentList}
      requiredRemove={requiredRemove}
      isOpen={showDialogDelete.isOpen}
      onClose={showDialogDelete.onClose}
      title={"Xoá sinh viên khỏi nhóm học phần"}
      content={`Bạn muốn xoá sinh viên ${requiredRemove.current?.fullName} khỏi nhóm học phần?\n Hành động này sẽ không thể hoàn tác.`}
      actionName={"Xoá"}
      colorButton={"red"} />
    </div>
  );
}

export default StudentList;
