export const countDocs = (docs, postId) => {
  return docs.filter((doc) => doc?.post?._id === postId).length;
};
export const renderDocType = (type) => {
  let defaultType = "file";
  if (type === "application/pdf") {
    return "file-pdf";
  }
  if (type === "application/doc") {
    return "file-doc";
  }
  return defaultType;
};
