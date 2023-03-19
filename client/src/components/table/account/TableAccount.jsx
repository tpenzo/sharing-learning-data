import React from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import RowAccount from "./RowAccount";
function TableAccount(props) {
  const { accounts, roles } = props;

  return (
    <TableContainer className="w-full" overflowX="unset" overflowY="unset">
      <Table>
        <Thead position={"sticky"} top={0} zIndex="docked" bg={"gray.300"}>
          <Tr>
            <Th>STT</Th>
            {roles === "student" ? <Th>MSSV</Th> : <Th>MSCB</Th>}
            <Th>Họ và tên</Th>
            <Th>Loại tài khoản</Th>
            <Th>Tùy chọn</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accounts && accounts.length> 0 && 
            accounts.map((account, index) => {
              return <RowAccount key={index} account={account} stt={index} />;
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableAccount;
