import React, { useState } from "react";
import { Tr, Td, Select, Button } from "@chakra-ui/react";
function RowAccount(props) {
  const { account, stt } = props;
  const [isOption, setIsOption] = useState(true);
  const [types, setTypes] = useState(["student", "ministry", "teacher"]);
  const renderTypeAcc = (currentAcc) => {
    return types.filter((type) => type !== currentAcc);
  };
  const handleChange = (e) => {
    if (e.target.value) {
      setIsOption(false);
    } else {
      setIsOption(true);
    }
    console.log(e.target.value);
  };
  return (
    <Tr>
      <Td>{stt + 1}</Td>
      <Td>{account.code}</Td>
      <Td>{account.fullName}</Td>
      <Td>
        <Select
          placeholder={account.typeAccount}
          defaultValue={account.typeAccount}
          onChange={handleChange}
        >
          {renderTypeAcc(account.typeAccount).map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </Select>
      </Td>
      <Td>
        {isOption ? (
          <ul className="flex items-center gap-2">
            <li className="cursor-pointer">
              <span>
                <box-icon name="trash"></box-icon>
              </span>
            </li>
            <li className="cursor-pointer">
              <span>
                <box-icon name="pencil"></box-icon>
              </span>
            </li>
          </ul>
        ) : (
          <div className="flex items-center gap-2">
            <Button colorScheme="teal" size="sm">
              Lưu
            </Button>
            <Button colorScheme={"pink"} variant={"outline"} size="sm">
              Hủy
            </Button>
          </div>
        )}
      </Td>
    </Tr>
  );
}

export default RowAccount;
