import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

export const uploadDocs = async (files) => {
  try {
    let urls = [];
    for (let i = 0; i <= [...files].length; i++) {
      const storageRef = ref(
        storage,
        `document/${[...files][i]?.name + Math.floor(Math.random() * 10000)}`
      );
      const uploadStask = await uploadBytesResumable(storageRef, [...files][i]);
      const url = await getDownloadURL(uploadStask.ref);

      console.log(url);
      urls.push({
        url,
        type: [...files][i]?.type,
      });
    }
    console.log("url", urls);
    return urls;
  } catch (error) {
    console.log(error);
  }
};
