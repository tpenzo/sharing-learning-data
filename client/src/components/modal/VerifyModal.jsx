import React from "react";
import { Button } from "@chakra-ui/react";
function VerifyModal(props) {
  const { title, hide, handleVerify, selectedId, docs = [] } = props;
  return (
    <div>
      <p className="font-bold">{title}</p>
      <div className="mt-4">
        <Button
          onClick={() => {
            handleVerify(true, selectedId, docs);
            hide();
          }}
          colorScheme={"messenger"}
          size={"sm"}
        >
          Đồng ý
        </Button>

        <Button
          onClick={hide}
          ml={4}
          colorScheme={"pink"}
          variant="outline"
          size={"sm"}
        >
          Từ chối
        </Button>
      </div>
    </div>
  );
}

export default VerifyModal;
