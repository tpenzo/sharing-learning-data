import React from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer, Spinner } from "@chakra-ui/react";
import RowAccount from "./RowAccount";
function TableAccount(props) {
  const { accounts, roles, setAccounts, action } = props;

  return (
    <TableContainer className="w-full" overflowX="unset" overflowY="auto">
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
              return <RowAccount action={action} setAccounts={setAccounts} key={account._id || index} account={account} stt={index} />;
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableAccount;
