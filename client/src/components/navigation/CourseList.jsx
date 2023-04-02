import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { selectCourse } from "../../redux/AllCoursesSlice";
function CourseList() {
  const auth = useSelector((state) => state.auth);
  const [courseList, setCourseList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const formatSemester = async (arr) => {
      const formatedSemester = arr.map((element)=>{
        return {...element, schoolyear: `HK${element.semester} ${element.schoolyear}`}
      })
      const mergedSemester = await formatedSemester.reduce(
        (acc, { schoolyear, name, courseID, groupNumber, _id }) => {
          acc[schoolyear] ??= { schoolyear, subjects: [] };
          if (Array.isArray(name)) {
            // if it's array type then concat
            acc[schoolyear].subjects = acc[schoolyear].subjects.concat({
              name,
              courseID,
              _id,
              groupNumber,
            });
          } else {
            acc[schoolyear].subjects.push({ name, courseID, _id, groupNumber });
          }
          return acc;
        },
        []
      );

      //map obj to array to render
      const mergedArr = Object.keys(mergedSemester).map((key) => {
        return { schoolyear: key, semesterInfomation: mergedSemester[key] };
      });
      return mergedArr;
    };

    formatSemester(auth.user.role==="student" ? auth.user.followingCourses : auth.user.managedCourses).then((response) => {
      setCourseList(response);
    });
  }, []);

  return (
    <div className="mt-4 h-[75%] w-full">
      <Accordion allowToggle defaultIndex={[0]}>
        {courseList &&
          courseList.length > 0 &&
          courseList.map((semesterInfo, index) => {
            return (
              <AccordionItem key={index} border={0}>
                <h2>
                  <AccordionButton className="hover:bg-inherit rounded-lg">
                    <Box
                      className="text-primary-blue text-base font-semibold"
                      as="span"
                      flex="1"
                      textAlign="left"
                    >
                      {`${semesterInfo.schoolyear.replace("HK 3", "HK Hè")} (${semesterInfo.semesterInfomation.subjects.length})`}
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel className="overflow-y-auto h-[200px] 2xl:h-[320px] ">
                  {semesterInfo.semesterInfomation.subjects.map(
                    (courseInfo, index) => {
                      return <CourseItem courseInfo={courseInfo} key={index} />;
                    }
                  )}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
}

export default CourseList;
