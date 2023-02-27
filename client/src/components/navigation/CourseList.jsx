import React, { useState } from "react";
import CourseItem from "./CourseItem";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
function CourseList() {
  const courseList = [
    {
      semester: "Học kì hiện tại",
      subjects: [
        {
          courseId: "CT222",
          courseName: " Nhập môn CNTT Nhập môn CNTT Nhập môn CNTT Nhập môn CNTT",
        },
        {
          courseId: "CT223",
          courseName: "Nhập môn CNTT",
        },
        {
          courseId: "CT224",
          courseName: "Nhập môn CNTT",
        },
        {
          courseId: "CT225",
          courseName: "Nhập môn CNTT",
        },
        {
          courseId: "CT226",
          courseName: "Nhập môn CNTT",
        },
      ],
    },
    {
      semester: "2021-2022",
      subjects: [
        {
          courseId: "CT222",
          courseName: "Nhập môn CNTT",
        },
        {
          courseId: "CT222",
          courseName: "Nhập môn CNTT",
        },
        {
          courseId: "CT222",
          courseName: "Nhập môn CNTT",
        },
        {
          courseId: "CT222",
          courseName: "Nhập môn CNTT",
        },
        {
          courseId: "CT222",
          courseName: "Nhập môn CNTT",
        },
      ],
    },
  ];
  return (
    <div className="mt-4 h-[75%] scale-90 2xl:scale-100 w-full">
      <Accordion allowToggle>
        {courseList.map((semesterInfo, index) => {
          return (
            <AccordionItem key={index} border={0}>
              <h2>
                <AccordionButton>
                  <Box
                    className="text-primary-blue text-lg font-semibold"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    {`${semesterInfo.semester} (${semesterInfo.subjects.length})`}
                    <AccordionIcon />
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel className="overflow-hidden h-[200px] 2xl:h-[320px] ">
                {semesterInfo.subjects.map((courseInfo, index) => {
                  return (
                    <CourseItem courseInfo={courseInfo} key={index} />
                  )
                })}
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  );
}

export default CourseList;
