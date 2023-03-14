import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import QuillEditor from "./QuillEditor";
import { createPost } from "../../Api/postAPI";
import { useDispatch } from "react-redux";
import { uploadDocs } from "../../utils/uploadDocs";

function CreatePost(props) {
  const { onClose } = props;
  const [content, setContent] = useState("");
  const [scope, setScope] = useState(false);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleSelectedFile = (e) => {
    if (!e.target.files) return;
    setDocs(e.target.files);
  };
  const handleChangeQuill = (html, editor, urls) => {
    setContent(html);
  };
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        courseId: "",
      },
      validationSchema: Yup.object().shape({
        title: Yup.string()
          .min(10, "Ít nhất có 10 kí tự")
          .max(155, "Tối đa 155 kí tự")
          .required("Vui lòng nhập tiêu đề!"),
        courseId: scope
          ? Yup.string().required("Vui lòng chọn lớp học phần!")
          : Yup.string(),
        description: Yup.string().max(255, "Tối đa 255 kí tự"),
      }),
      onSubmit: async (values) => {
        setLoading(true);
        let arr = [];
        if (docs.length > 0) {
          arr = await uploadDocs(docs);
          setLoading(false);
        }
        values.docs = arr;
        values.content = content;
        const { message } = await createPost(values, dispatch);
        if (message === "successful!") {
          onClose();
        }
      },
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-10">
          <FormControl className="mt-4">
            <FormLabel>Chế độ</FormLabel>
            <Select
              placeholder="Chọn Chế độ"
              size={"md"}
              value={scope || false}
              onChange={(e) => {
                setScope(e.target.value);
              }}
            >
              <option value={false}>Công khai</option>
              <option value={true}>Riêng tư</option>
            </Select>
          </FormControl>
          <FormControl
            className="mt-4"
            isInvalid={errors.courseId && touched.courseId}
          >
            <FormLabel>Lớp học phần:</FormLabel>
            <Select
              name="courseId"
              placeholder="Chọn Lớp học phần"
              size={"md"}
              isDisabled={!scope}
              value={values.courseId}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="1">CT242</option>
              <option value="2">CT495</option>
              <option value="3">CT131</option>
            </Select>
            {errors.courseId && touched.courseId && (
              <FormErrorMessage>{errors.courseId}</FormErrorMessage>
            )}
          </FormControl>
        </div>
        <FormControl className="mt-4" isInvalid={errors.title && touched.title}>
          <FormLabel>Tiêu đề:</FormLabel>
          <Input
            type="text"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            name="title"
          />
          {errors.title && touched.title && (
            <FormErrorMessage>{errors.title}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          className="mt-4"
          isInvalid={errors.description && touched.description}
        >
          <FormLabel>Mô tả:</FormLabel>
          <Input
            type="text"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
          />
          {errors.description && touched.description && (
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl className="mt-4">
          <FormLabel>Nội dung:</FormLabel>

          <QuillEditor
            content={content}
            handleChangeQuill={handleChangeQuill}
          />
        </FormControl>
        <FormControl className="mt-4">
          <FormLabel htmlFor="doc" className="cursor-pointer">
            <p className="flex items-center">
              <box-icon name="file"></box-icon>
              <span className="text-sm">Đính kèm tệp</span>
            </p>
          </FormLabel>
          {docs.length > 0 ? (
            <span className="text-sm font-bold">{docs.length} Tài liệu</span>
          ) : null}

          <Input
            hidden={true}
            id="doc"
            type="file"
            accept="*"
            onChange={handleSelectedFile}
            name="docs"
            multiple
          />
        </FormControl>
        <Button
          colorScheme="blue"
          className="mt-4 mr-3"
          type="submit"
          isLoading={loading}
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

export default CreatePost;
