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

export const checkImage = (file) => {
   let err = '';
   if (!file) return (err = 'File does not exist.');
   if (file.size > 1024 * 1024) {
      err = 'The largest image size is 1mb.';
   }
   if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/avif'
   )
      err = 'Image format is incorrect.';
   return err;
};