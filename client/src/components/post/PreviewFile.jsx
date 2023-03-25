import React from "react";

function PreviewFile(props) {
  const { file, onClose } = props;
  return <iframe src={file} width={"100%"} height={"530px"}></iframe>;
}

export default PreviewFile;
