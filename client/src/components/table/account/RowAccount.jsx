import React, { useState } from "react";
import ShowDialog from "../../dialog/ShowDialog";
import { useDisclosure } from "@chakra-ui/react";

import { Tr, Td, Select, Button } from "@chakra-ui/react";
import ModalAddAccountForm from "../../modal/AddAccountForm";
function RowAccount(props) {
  const { account, stt, setAccounts } = props;
  const [isOption, setIsOption] = useState(true);
  const [types, setTypes] = useState(["student", "ministry", "teacher"]);
  const showAcceptDeleteAccount = useDisclosure();
  const modifyAccountForm = useDisclosure();

  const renderTypeAcc = (currentAcc) => {
    return types.filter((type) => type !== currentAcc);
  };

  const handleSaveButton = () => {
    setIsOption(true);
  };

  const handleCancelButton = () => {
    setIsOption(true);
  };

  const handleChange = (e) => {
    if (e.target.value) {
      setIsOption(false);
    } else {
      setIsOption(true);
    }
  };
  return (
    <Tr className="text-sm hover:bg-gray-200">
      <Td>{stt + 1}</Td>
      {account?.role === "student" ? (
        <Td>{account?.studentCode}</Td>
      ) : (
        <Td>{account?.teacherCode}</Td>
      )}
      <Td>{account?.fullName}</Td>
      <Td>
        <Select
          placeholder={account?.role}
          defaultValue={account?.role}
          onChange={handleChange}
        >
          {renderTypeAcc(account.role).map((type) => {
            return (
              <option
                className="border border-gray-100"
                key={type}
                value={type}
              >
                {type}
              </option>
            );
          })}
        </Select>

        {/* modal accept remove account */}
        <ShowDialog
          setAccounts={setAccounts}
          account={account}
          action={"removeAccount"}
          isOpen={showAcceptDeleteAccount.isOpen}
          onClose={showAcceptDeleteAccount.onClose}
          title={"Xoá tài khoản"}
          content={`Bạn muốn xoá tài khoản ${
            account.role === "student"
              ? account?.studentCode
              : account?.teacherCode
          }-${account.fullName}?
           Hành động này sẽ không thể hoàn tác.`}
          actionName={"Xoá"}
          colorButton={"red"}
        />

        {/* modal modify account info */}
        <ModalAddAccountForm
          action={"modify"}
          account={account}
          title={"Chỉnh sửa thông tin"}
          isOpen={modifyAccountForm.isOpen}
          onClose={modifyAccountForm.onClose}
          setAccounts={setAccounts}
        />

        <ModalAddAccountForm />
      </Td>
      <Td>
        {isOption ? (
          <ul className="flex items-center gap-2">
            <li
              onClick={showAcceptDeleteAccount.onOpen}
              className="cursor-pointer"
            >
              <span>
                <box-icon name="trash"></box-icon>
              </span>
            </li>
            <li onClick={modifyAccountForm.onOpen} className="cursor-pointer">
              <span>
                <box-icon name="pencil"></box-icon>
              </span>
            </li>
          </ul>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSaveButton}
              className="bg-blue-600"
              colorScheme="blue"
              size="sm"
            >
              Lưu
            </Button>
            <Button onClick={handleCancelButton} colorScheme={"pink"} size="sm">
              Hủy
            </Button>
          </div>
        )}
      </Td>
    </Tr>
  );
}

export default RowAccount;
