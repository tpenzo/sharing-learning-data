import React, { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, Input, Select, FormErrorMessage } from "@chakra-ui/react";
import courses from "../../data/CoursesData";
import { useFormik } from "formik";
import * as Yup from "yup";

import QuillEditor from "./QuillEditor";
import { createPost, editPost } from "../../Api/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { uploadDocs, removeDocs } from "../../utils/uploadDocs";
import { deleteDoc } from "../../Api/documentAPI";
import { useLocation } from "react-router-dom";

function FormPost(props) {
  const { onClose, isEdit, post } = props;

  const [content, setContent] = useState("");
  const [oldDocs, setOldDocs] = useState([]);
  const [scope, setScope] = useState(false);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { followingCourses, managedCourses, role } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const location = useLocation();

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
  const handleRemoveOldDoc = async (doc, index) => {
    await removeDocs([doc]);
    await deleteDoc(doc._id);
    setOldDocs(oldDocs.filter((doc, i) => i !== index));
  };
  const { values, errors, handleChange, handleBlur, handleSubmit, touched, setValues, submitForm } = useFormik({
    initialValues: {
      title: "",
      description: "",
      courseId: "",
      tag: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(10, "Ít nhất có 10 kí tự")
        .max(155, "Tối đa 155 kí tự")
        .required("Vui lòng nhập tiêu đề!"),
      courseId: scope ? Yup.string().required("Vui lòng chọn lớp học phần!") : Yup.string(),
      description: Yup.string().max(255, "Tối đa 255 kí tự"),
      tag: Yup.string().min(5, "Tối thiểu 5 kí tự"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      let arr = [];
      if (docs.length > 0) {
        arr = await uploadDocs(docs);
      }
      values.docs = arr;
      values.content = content;

      if (isEdit) {
        let position;
        if (location.pathname.includes("/courses")) {
          position = "courses";
        } else if (location.pathname.includes("/profile")) {
          position = "profile";
        } else {
          position = "home";
        }
        const { message } = await editPost(values, dispatch, post._id, position);
        console.log(message);
        if (message === "successful!") {
          setLoading(false);
          onClose();
        }
      } else {
        const { message } = await createPost(values, dispatch);
        if (message === "successful!") {
          setLoading(false);
          onClose();
        }
      }
    },
  });
  useEffect(() => {
    if (isEdit) {
      setValues({
        courseId: post?.course?._id,
        title: post?.title,
        description: post?.description,
        tag: post?.tag || "Riêng tư",
      });
      setScope(post?.course?._id ? true : false);
      setContent(post?.content);

      if (post?.docs && post?.docs.length > 0) {
        setOldDocs(post?.docs);
      }
    }
  }, [post]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-10">
          <FormControl className="mt-4">
            <FormLabel>Chế độ</FormLabel>
            <Select
              placeholder="Chọn Chế độ"
              size={"md"}
              value={Boolean(scope)}
              onChange={(e) => {
                if (scope) {
                  values.courseId = "";
                }
                setScope(!scope);
              }}
            >
              <option value={false}>Công khai</option>
              <option value={true}>Riêng tư</option>
            </Select>
          </FormControl>
          {
            //public
            scope && (
              <FormControl className="mt-4" isInvalid={errors.courseId && touched.courseId && scope}>
                <FormLabel>Lớp học phần:</FormLabel>
                <Select
                  name="courseId"
                  placeholder="Chọn Lớp học phần"
                  size={"md"}
                  isDisabled={!scope}
                  value={values.courseId || " "}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {role === "student"
                    ? followingCourses &&
                      followingCourses.length > 0 &&
                      followingCourses.map((course) => {
                        return (
                          <option key={course._id} value={course._id}>{`${course.courseID}-${
                            course.groupNumber.length < 2 ? `0${course.groupNumber}` : course.groupNumber
                          }-HK${course.semester} ${course.schoolyear} ${course.name}`}</option>
                        );
                      })
                    : managedCourses &&
                      managedCourses.length > 0 &&
                      managedCourses.map((course) => {
                        return (
                          <option key={course._id} value={course._id}>{`${course.courseID}-${
                            course.groupNumber.length < 2 ? `0${course.groupNumber}` : course.groupNumber
                          }-HK${course.semester} ${course.schoolyear}`}</option>
                        );
                      })}
                </Select>
                {errors.courseId && touched.courseId && scope && <FormErrorMessage>{errors.courseId}</FormErrorMessage>}
              </FormControl>
            )
          }

          {
            //private
            !scope && (
              <FormControl className="mt-4" isInvalid={errors.tag && touched.tag && !scope}>
                <FormLabel>Môn học liên quan:</FormLabel>
                <Input
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="tag"
                  value={values.tag}
                  list="courseIDList"
                  autoComplete="off"
                  placeholder="Mã môn"
                />
                {/* suggestion for courseID */}
                <datalist id="courseIDList">
                  {values?.tag &&
                    values?.tag.length > 1 &&
                    courses.map((course) => {
                      return (
                        <option key={course.courseId} value={`${course.courseId} - ${course.courseName}`}>
                          {course.courseId + " - " + course.courseName}
                        </option>
                      );
                    })}
                </datalist>
                {errors.tag && touched.tag && !scope && <FormErrorMessage>{errors.tag}</FormErrorMessage>}
              </FormControl>
            )
          }
        </div>
        <FormControl className="mt-4" isInvalid={errors.title && touched.title}>
          <FormLabel>Tiêu đề:</FormLabel>
          <Input type="text" value={values.title || ""} onChange={handleChange} onBlur={handleBlur} name="title" />
          {errors.title && touched.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
        </FormControl>
        <FormControl className="mt-4" isInvalid={errors.description && touched.description}>
          <FormLabel>Mô tả:</FormLabel>
          <Input
            type="text"
            value={values.description || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
          />
          {errors.description && touched.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
        </FormControl>
        <FormControl className="mt-4">
          <FormLabel>Nội dung:</FormLabel>

          <QuillEditor content={content || ""} handleChangeQuill={handleChangeQuill} />
        </FormControl>
        <FormControl className="mt-4">
          <FormLabel htmlFor="docnek" className="cursor-pointer">
            <div className="w-[101.5%] border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Kéo và thả tập tin </span>&nbsp;
                <span>của bạn vào hoặc</span>
              </p>
              <span className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300">Đăng tải tệp</span>
            </div>
          </FormLabel>
          {docs.length > 0 ? (
            <div>
              <span className="text-sm font-bold">{docs.length} Tài liệu</span>
              <ul className="flex gap-2">
                {docs.map((doc, index) => {
                  return (
                    <li className="relative" key={`n${index}`}>
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

          <Input hidden={true} id="docnek" type="file" accept="*" onChange={handleSelectedFile} name="docs" multiple />
        </FormControl>
        {oldDocs && oldDocs.length > 0 ? (
          <div>
            <span className="text-sm font-bold">{oldDocs.length} Tài liệu hiện tại</span>
            <ul className="flex gap-2">
              {oldDocs.map((doc, index) => {
                console.log(doc);
                return (
                  <li className="relative" key={`o${index}`}>
                    <box-icon name="file" size={"48px"}></box-icon>
                    <p
                      onClick={() => {
                        handleRemoveOldDoc(doc, index);
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

        <Button type="submit" isLoading={loading} colorScheme="blue" className=" mt-4 mr-3">
          {isEdit ? "Lưu" : "Đăng bài"}
        </Button>

        <Button className="mt-4" onClick={onClose}>
          Hủy
        </Button>
      </form>
    </div>
  );
}

export default FormPost;
