import React, { useRef, useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

function QuillEditor(props) {
  const { content, handleChangeQuill } = props;
  const quillRef = useRef(null);
  useEffect(() => {
    const dataFiles = [];
    quillRef.current
      .getEditor()
      .getModule("toolbar")
      .addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "*");
        input.click();
        input.onchange = async () => {
          if (!input.files || !input?.files?.length || !input?.files?.[0])
            return;
          const editor = quillRef?.current?.getEditor();
          const file = input.files[0];

          dataFiles.push(file);
          console.log(dataFiles);
          // Save File

          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", "img");
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
  };
  const handleChange = (html, delta, source, editor) => {
    handleChangeQuill(html, editor);
  };
  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      modules={modules}
      className="mt-4 text-base"
      theme="snow"
      onChange={handleChange}
    />
  );
}

export default QuillEditor;
