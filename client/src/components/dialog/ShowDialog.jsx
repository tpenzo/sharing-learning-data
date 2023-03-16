import React, { useRef } from "react";
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

  const removeStudent = (student) => {
    setStudentList((studentList) => [
      ...studentList.filter((studentElem) => {
        return student._id !== studentElem._id;
      }),
    ]);
    onClose();
  };

  const removeCourse = (course) => {
    console.log(course._id);
    //dispatch(removeCourse(course._id))
    removeCourseAPI(course);
    const fetchData = async () => {
      await getCoursesList(dispatch);
    };
    fetchData();
    onClose();
  };

  const handleClick = () => {
    switch (action) {
      case "removeCourse":
        removeCourse(course)
        break;
      case "removeStudent":
        removeStudent(requiredRemove.current);
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
