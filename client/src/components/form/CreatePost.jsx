import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import QuillEditor from "./QuillEditor";
import { renderError } from "../../utils/renderErrorInput";
function PostForm(props) {
  const { onClose } = props;
  const [quill, setQuill] = useState({
    status: true,
    message: "",
    html: null,
  });
  const handleChangeQuill = (html, editor) => {
    if (editor.getLength() <= 1) {
      return setQuill({ status: true, message: "Vui lòng nhập nội dung" });
    }
    setQuill({ ...quill, html, status: false });
    formik.values.content = html;
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      courseId: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(10, "Ít nhất có 10 kí tự")
        .max(155, "Tối đa 155 kí tự")
        .required("Vui lòng nhập tiêu đề!"),
      courseId: Yup.string().required("Vui lòng chọn lớp học phần!"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Call api
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormControl className="mt-4">
          <FormLabel>Lớp học phần:</FormLabel>
          <Select
            name="courseId"
            placeholder="Chọn Lớp học phần"
            size={"md"}
            value={formik.courseId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.errors.courseId &&
              formik.touched.courseId &&
              renderError(formik.errors.courseId)
            }
          >
            <option value="1">CT242</option>
            <option value="2">CT495</option>
            <option value="3">CT131</option>
          </Select>
          {formik.errors.courseId &&
            formik.touched.courseId &&
            renderError(formik.errors.courseId)}
        </FormControl>
        <FormControl className="mt-4">
          <FormLabel>Tiêu đề:</FormLabel>
          <Input
            type="text"
            value={formik.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="title"
            isInvalid={
              formik.errors.title &&
              formik.touched.title &&
              renderError(formik.errors.title)
            }
          />
          {formik.errors.title &&
            formik.touched.title &&
            renderError(formik.errors.title)}
        </FormControl>
        <FormControl className="mt-4">
          <FormLabel>Nội dung:</FormLabel>

          <QuillEditor
            content={quill.html}
            handleChangeQuill={handleChangeQuill}
          />
          {quill.status && renderError(quill.message)}
        </FormControl>
        <Button
          isDisabled={quill.status}
          colorScheme="blue"
          className="mt-4 mr-3"
          type="submit"
        >
          Lưu
        </Button>
        <Button className="mt-4" onClick={onClose}>
          Hủy
        </Button>
      </form>
    </>
  );
}

export default PostForm;
