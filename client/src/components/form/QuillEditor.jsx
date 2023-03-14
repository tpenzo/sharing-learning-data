import React, { useRef, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

import { storage } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
function QuillEditor(props) {
  const { content, handleChangeQuill, readOnly, isEdit } = props;
  const quillRef = useRef(null);
  const urls = useRef([]);
  const fileNames = useRef([]);
  useEffect(() => {
    quillRef.current
      .getEditor()
      .getModule("toolbar")
      .addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/png, image/jpeg, image/jpg");
        input.click();
        input.onchange = async () => {
          if (!input.files || !input?.files?.length || !input?.files?.[0])
            return;
          const editor = quillRef?.current?.getEditor();

          const file = input.files[0];
          let url;
          // Save File
          const storageRef = ref(storage, `posts/${file.name}`);
          const uploadTask = await uploadBytesResumable(storageRef, file);
          fileNames.current.push(file.name);
          try {
            url = await getDownloadURL(uploadTask.ref);
            urls.current.push(url);
          } catch (error) {
            console.log(error);
          }

          let range = editor.getSelection();
          let position = range ? range.index : 0;

          editor.insertEmbed(position, "image", url);
          editor.setSelection(position + 1);
        };
      });
  }, [quillRef]);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
        [{ align: [] }],
      ],
      scrollingContainer: "#editorcontainer",
    },
    imageDrop: true,
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };
  const handleChange = (html, delta, source, editor) => {
    handleChangeQuill(html, editor, urls.current);
    if (fileNames.current.length > 0) {
      fileNames.current.forEach(async (imageUrl) => {
        if (String(html).indexOf(imageUrl) < 0) {
          // Remove urls
          const storageRef = ref(storage, `posts/${imageUrl}`);
          fileNames.current.pop(imageUrl);

          const check = await deleteObject(storageRef);
          console.log("check", check);
        }
      });
    }
  };

  return (
    <ReactQuill
      readOnly={readOnly}
      ref={quillRef}
      value={content}
      modules={modules}
      className={`mt-4 text-base overflow-hidden ${readOnly ? "readonly" : ""}`}
      theme="snow"
      onChange={handleChange}
    />
  );
}

export default QuillEditor;
