import React, { useEffect, useState } from "react";
import PopularUserInfo from "./PopularUserInfo";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
function ListOfUser(props) {
  const {userList, title} = props
  useEffect(()=>{
    
  }, [])
  return (
    <div className="mt-4 h-[75%] w-full">
      <Accordion  defaultIndex={[0]} allowToggle>
        <AccordionItem border={0} >
          <h2>
            <AccordionButton className="hover:bg-inherit rounded-lg">
              <Box className="text-primary-blue text-base font-semibold" as="span" flex="1" textAlign="left">
                {title}
              <AccordionIcon />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel className="overflow-y-auto h-44 2xl:h-72">
            {
            userList && userList.length>0 &&
            userList.map((user=>{
              return (<PopularUserInfo key={user._id} user={user} />)
            }))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default ListOfUser;
