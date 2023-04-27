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
   if (!file) return (err = 'Tập tin không tồn tại');
   if (file.size > 1024 * 1024) {
      err = 'Kích thước hình ảnh lớn nhất là 1mb';
   }
   if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/avif'
   )
      err = 'Định dạng hình ảnh không chính xác';
   return err;
};