import React, {useState} from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import RowAccount from "./RowAccount";
import { useDispatch } from "react-redux";
function TableAccount(props) {
  const { accounts, roles, setAccounts, action } = props;
  const dispatch = useDispatch();
  let [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const showMore = async () => {
    setIsLoading(true);

    setPage(++page);
    setIsLoading(false);
  };
  return (
    <TableContainer className="w-full" overflowX="unset" overflowY="auto">
      <Table overflowY="auto" colorScheme={"facebook"}>
        <Thead position={"sticky"} top={0} zIndex="docked">
          <Tr className="bg-blue-400">
            <Th color={"white"}>STT</Th>
            <Th color={"white"}>{roles === "student" ? "MSSV" : "MSCB"}</Th>
            <Th color={"white"}>Họ và tên</Th>
            <Th color={"white"}>Loại tài khoản</Th>
            <Th color={"white"}>Tùy chọn</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accounts &&
            accounts.length > 0 &&
            accounts.map((account, index) => {
              return (
                <RowAccount
                  action={action}
                  setAccounts={setAccounts}
                  key={account._id || index}
                  account={account}
                  stt={index}
                />
              );
            })}
          {
            accounts && accounts.length > 15 &&
            <Td colSpan={"9"} textAlign={"center"}>
            <Button
              onClick={showMore}
              isLoading={isLoading}
              className="bg-blue-300 focus:bg-blue-400 focus:ring-2 focus:ring-blue-500"
              textColor={"white"}
            >
              Xem thêm
            </Button>
          </Td>
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableAccount;
