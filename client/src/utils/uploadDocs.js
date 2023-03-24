import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";


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

export const uploadImg = async (image) => {
  try {
    let urls = [];
    const storageRef = ref(
        storage,
        `document/${[...files][i]?.name + Math.floor(Math.random() * 10000)}`
      );
      const uploadStask = await uploadBytesResumable(storageRef, image);
      const url = await getDownloadURL(uploadStask.ref);

      console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
};

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
