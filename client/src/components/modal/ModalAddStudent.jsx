import React, { useEffect, useState, useRef } from "react";
import { addStudentIntoCourseAPI, getInfoByStudentCodeAPI } from "../../Api/coursesAPI";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import showToast from "../../Api/showToast";
function ModalAddStudent(props) {
  const { isOpen, onOpen, onClose } = props;
  const [studentCode, setStudentCode] = useState("");
  const [studentName, setStudentName] = useState("Tên Sinh Viên");
  const studentInfo = useRef(null);
  const { courseId } = useParams();


  //search student info when type correct studentCode
  const handleSearchStudent = async ()=>{
    if(studentCode.length > 7){
       studentInfo.current = await getInfoByStudentCodeAPI(studentCode.toUpperCase());
      console.log(studentInfo);
      if(studentInfo.current){
        setStudentName(studentInfo.current.fullName)
      } else{
        setStudentName("Không tìm thấy sinh viên")
      }
    }
  }

  const handleAddStudentIntoCourse = async ()=>{
    if(studentInfo.current){
      const submitData = {
        courseId: courseId,
        student_id: studentInfo.current._id
      }
      await addStudentIntoCourseAPI(submitData);
      onClose()
    } else{
      showToast('Vui lòng nhập đúng mã số sinh viên', 'warning')
    }
    
  }

  useEffect(()=>{
    handleSearchStudent()
  }, [studentCode])

  useEffect(()=>{
    setStudentCode("");
    setStudentName("");
  }, [isOpen])
  return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset='scale'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm Sinh Viên</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div className="">
                <div className="">
                    <span>Mã số sinh viên</span>
                    <input
                    value={studentCode}
                    onChange={(e)=>{
                      setStudentCode(e.target.value)
                    }}
                    className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" type="text" />
                </div>
                <div className="mt-5">
                    <span>Họ và tên</span>
                    <input
                    value={studentName}
                    onChange={(e)=>{setStudentName(e.target.value)}}
                    className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" type="text" disabled={true} />
                </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleAddStudentIntoCourse} colorScheme='blue' mr={3}>
              Thêm Sinh Viên
            </Button>
            <Button onClick={onClose}>Huỷ</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

export default ModalAddStudent;
