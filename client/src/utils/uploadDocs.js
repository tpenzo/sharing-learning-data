import showToast from "../Api/showToast";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const uploadImg = async (image) => {
  try {
    const storageRef = ref(
      storage,
      `images/${image?.name + Math.floor(Math.random() * 10000)}`
    );
    const uploadStask = await uploadBytesResumable(storageRef, image);
    const url = await getDownloadURL(uploadStask.ref);
    return url;
  } catch (error) {
    showToast("Quá trình tải lên xảy ra lỗi", "error");
    return null;
  }
};

export const uploadDocs = async (files) => {
  try {
    let urls = [];
    for (let file of [...files]) {
      const storageRef = ref(
        storage,
        `document/${file?.name + Math.floor(Math.random() * 10000)}`
      );
      const uploadStask = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(uploadStask.ref);

      urls.push({
        url,
        type: file?.type,
        name: file?.name,
      });
    }
    return urls;
  } catch (error) {
    showToast("Quá trình tải lên xảy ra lỗi", "error");
  }
};
