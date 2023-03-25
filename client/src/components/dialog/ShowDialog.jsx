import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import { removeCourseAPI, getCoursesList } from "../../Api/coursesAPI";
import { removeAccountAPI } from "../../Api/manageAPI";
import { getTeacherListAccountAPI, getStudentListAccountAPI, getMinistryListAccountAPI } from "../../Api/manageAPI";

function ShowDialog(props) {
  const {
    title,
    content,
    action,
    actionName,
    colorButton,
    isOpen,
    onClose,
    studentList,
    setStudentList,
    requiredRemove,
    course,
    account,
    setAccounts
  } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const studentAccounts = useSelector(state => state.manage.studentList)
  const teacherAccounts = useSelector(state => state.manage.teacherList)
  const ministryAccounts = useSelector(state => state.manage.ministryList)

  const removeStudentHandle = (student) => {
    setStudentList((studentList) => [
      ...studentList.filter((studentElem) => {
        return student?._id !== studentElem?._id;
      }),
    ]);
    setIsLoading(false)
    onClose();
  };

  const removeCourseHandle = async (course) => {
      await removeCourseAPI(course);
      await getCoursesList(dispatch);
      setIsLoading(false)
      onClose();
  };

  const removeAccountHandle = async (account) =>{
      await removeAccountAPI(account?._id)
      switch (account?.role){
        case "student":
          await getStudentListAccountAPI(dispatch);
          await setAccounts(studentAccounts);
          setIsLoading(false)
        break;
        case "teacher":
          await getTeacherListAccountAPI(dispatch);
          await setAccounts(teacherAccounts);
          setIsLoading(false)
        break;
        case "ministry":
          await getMinistryListAccountAPI(dispatch);
          await setAccounts(ministryAccounts);
          setIsLoading(false)
        break;
      }
      //loading
      onClose()
  }

  const handleClick = () => {
    setIsLoading(true)
    switch (action) {
      case "removeCourse":
        removeCourseHandle(course?course:undefined);
        break;
      case "removeStudent":
        removeStudentHandle(requiredRemove.current);
        break;
      case "removeAccount":
        removeAccountHandle(account);
    }
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{content}</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Huỷ</Button>
            <Button
            isLoading={isLoading}
              onClick={() => {
                handleClick();
              }}
              colorScheme={colorButton}
              ml={3}
            >
              {actionName}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ShowDialog;
