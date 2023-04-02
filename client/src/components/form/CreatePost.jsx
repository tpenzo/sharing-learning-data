import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { uploadDocs } from "../../utils/uploadDocs";

function CreatePost(props) {
  const { onClose } = props;
  const [content, setContent] = useState("");
  const [scope, setScope] = useState(false);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const {followingCourses, managedCourses, role} = useSelector((state) => state.auth.user)



  const dispatch = useDispatch();
  const handleSelectedFile = (e) => {
    if (!e.target.files) return;
    setDocs([...docs, ...e.target.files]);
  };
  const handleChangeQuill = (html, editor, urls) => {
    setContent(html);
  };
  const handleRemoveFile = (index) => {
    setDocs([...docs.filter((doc, i) => i !== index)]);
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
        }
        values.docs = arr;
        values.content = content;
        const { message } = await createPost(values, dispatch);
        console.log(values);
        if (message === "successful!") {
          setLoading(false);
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
              value={Boolean(scope)}
              onChange={(e) => {
                if(scope){
                  values.courseId = ""
                }
                setScope(!scope);
              }}
            >
              <option value={false}>Công khai</option>
              <option value={true}>Riêng tư</option>
            </Select>
          </FormControl>
          <FormControl
            className="mt-4"
            isInvalid={errors.courseId && touched.courseId && scope}
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
              {
                role === "student" ?
                (followingCourses && followingCourses.length > 0 &&
                followingCourses.map((course)=>{
                  return (<option key={course._id} value={course._id}>{`${course.courseID}-${course.groupNumber.length<2 ? `0${course.groupNumber}` : course.groupNumber}-HK${course.semester} ${course.schoolyear}`}</option>)
                })) :
                 (managedCourses && managedCourses.length > 0 &&
                  managedCourses.map((course)=>{
                    return (<option key={course._id} value={course._id}>{`${course.courseID}-${course.groupNumber.length<2 ? `0${course.groupNumber}` : course.groupNumber}-HK${course.semester} ${course.schoolyear}`}</option>)
                  }))
              }
            </Select>
            {errors.courseId && touched.courseId && scope && (
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
            <div>
              <span className="text-sm font-bold">{docs.length} Tài liệu</span>
              <ul className="flex gap-2">
                {docs.map((doc, index) => {
                  return (
                    <li className="relative">
                      <box-icon name="file" size={"48px"}></box-icon>
                      <p
                        onClick={() => {
                          handleRemoveFile(index);
                        }}
                        title={doc.name}
                        className="absolute top-0 right-0 cursor-pointer bg-gray-500 w-5 h-5 rounded-full flex items-center justify-center"
                      >
                        <box-icon name="x" color={"white"}></box-icon>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
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
