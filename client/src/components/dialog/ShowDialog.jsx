import React, { useEffect, useRef } from "react";
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
  } = props;
  const dispatch = useDispatch();

  const removeStudentHandle = (student) => {
    setStudentList((studentList) => [
      ...studentList.filter((studentElem) => {
        return student._id !== studentElem._id;
      }),
    ]);
    onClose();
  };

  const removeCourseHandle = async (course) => {
      await removeCourseAPI(course);
      await getCoursesList(dispatch);
      //loading here
      onClose();
  };

  const handleClick = () => {
    switch (action) {
      case "removeCourse":
        removeCourseHandle(course?course:undefined)
        break;
      case "removeStudent":
        removeStudentHandle(requiredRemove.current);
        break;
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
