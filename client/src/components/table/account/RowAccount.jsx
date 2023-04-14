import React, { useState } from "react";
import ShowDialog from "../../dialog/ShowDialog";
import { useDisclosure } from "@chakra-ui/react";

import { Tr, Td, Select, Button, SkeletonText } from "@chakra-ui/react";
import ModalAddAccountForm from "../../modal/AddAccountForm";
function RowAccount(props) {
  const { account, stt, setAccounts, action,version , setVersion } = props;
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
    <Tr className="text-sm hover:bg-blue-50">
      <Td>{stt + 1}</Td>
      {account?.role === "student" ? (
        <Td>{account?.studentCode}</Td>
      ) : (
        <Td>{account?.teacherCode}</Td>
      )}
      <Td>{account?.fullName}</Td>
      <Td paddingLeft={"32px"}>
        {account?.role === "student"
          ? "Sinh viên"
          : account?.role === "teacher"
          ? "Giảng viên"
          : account?.role === "ministry"
          ? "Giáo vụ"
          : "Không có"}

        {/* modal accept remove account */}
        <ShowDialog
          version={version}
          setVersion={setVersion}
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
          action={action}
          account={account}
          title={"Chỉnh sửa thông tin"}
          isOpen={modifyAccountForm.isOpen}
          onClose={modifyAccountForm.onClose}
          setAccounts={setAccounts}
        />
      </Td>
      <Td>
        {isOption ? (
          action === "view" ? (
            <ul className="flex items-center justify-center gap-2">
              <li onClick={modifyAccountForm.onOpen}>
                <span
                  title="Xem thông tin chi tiết"
                  className="-ml-7 cursor-pointer"
                >
                  <box-icon name="show-alt"></box-icon>
                </span>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center gap-2">
              <li
                onClick={showAcceptDeleteAccount.onOpen}
                className="cursor-pointer"
              >
                <span>
                  <box-icon color="gray" name="trash"></box-icon>
                </span>
              </li>
              <li onClick={modifyAccountForm.onOpen} className="cursor-pointer">
                <span>
                  <box-icon color="gray" name="pencil"></box-icon>
                </span>
              </li>
            </ul>
          )
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
