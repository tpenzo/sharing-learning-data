import showToast from '../Api/showToast';
import { storage } from '../firebase';
import {
   ref,
   getDownloadURL,
   uploadBytesResumable,
   deleteObject,
} from 'firebase/storage';

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
      showToast('Quá trình tải lên xảy ra lỗi', 'error');
      return null;
   }
};

export const uploadDocs = async (files) => {
   try {
      let urls = [];
      for (let file of [...files]) {
         const numberRandom = Math.floor(Math.random() * 10000);
         const storageRef = ref(storage, `document/${file?.name + numberRandom}`);
         const uploadStask = await uploadBytesResumable(storageRef, file);
         const url = await getDownloadURL(uploadStask.ref);

         urls.push({
            url,
            type: file?.type,
            name: file?.name + numberRandom,
         });
      }
      return urls;
   } catch (error) {
      showToast('Quá trình tải lên xảy ra lỗi', 'error');
   }
};
export const removeDocs = async (docs) => {
   try {
      for (const doc of docs) {
         const desertRef = ref(storage, `document/${doc?.name}`);
         await deleteObject(desertRef);
      }
   } catch (error) {
      showToast('Quá trình xóa tài liệu xảy ra lỗi', 'error');
   }
};

export const removeImage = async (img) => {
   try {
      let imageRef = ref(storage, img);
      await deleteObject(imageRef);
   } catch (error) {
      showToast('Quá trình xóa tài liệu xảy ra lỗi', 'error');
   }
};
