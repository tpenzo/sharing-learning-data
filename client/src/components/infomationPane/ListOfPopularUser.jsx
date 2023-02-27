import React, { useState } from "react";
import PopularUserInfo from "./PopularUserInfo";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
function ListOfPopularUser() {
  return (
    <div>
      <Accordion allowToggle>
        <AccordionItem border={0} >
          <h2>
            <AccordionButton>
              <Box className="text-primary-blue text-lg font-semibold" as="span" flex="1" textAlign="left">
                Người dùng nổi bật
              <AccordionIcon />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel className="overflow-auto h-[180px] 2xl:h-[320px]">
            <PopularUserInfo />
            <PopularUserInfo />
            <PopularUserInfo />
            <PopularUserInfo />
            <PopularUserInfo />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ListOfPopularUser;
