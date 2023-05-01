import React, { useEffect, useState } from "react";
import SideNav from "../components/navigation/SideNav";
import CourseInfoPane from "../components/sidepane/CourseInfoPane";
import PostItem from "../components/post/PostItem";
import Header from "../components/header/Header";
import { getCourseAPI } from "../Api/coursesAPI";
import { useParams } from "react-router-dom";
import { getCoursePostAPI, likePost, unLikePost, updateStatusPost } from "../Api/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectCourse, selectCourse } from "../redux/AllCoursesSlice";
import { getCourseDocList } from "../Api/documentAPI";
import moment from "moment";
export default function CoursePage() {
  const [course, setCourse] = useState({});
  const { selectedCourse } = useSelector((state) => state.allCoursesList);
  const [tab, setTab] = useState("post");
  const { idCourse } = useParams();
  const { postCourseList } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { docCourseList } = useSelector((state) => state.document.docs);
  const dispatch = useDispatch();
  const handleChangeTab = (e) => {
    setTab(e.target.id);
  };

  //get course info
  useEffect(() => {
    getCourseAPI(idCourse).then((course) => {
      setCourse(course);
      dispatch(selectCourse(idCourse));
    });
  }, [idCourse]);

  //clear select course when leavecd serv
  useEffect(() => {
    return () => dispatch(resetSelectCourse());
  }, []);

  //get post list
  useEffect(() => {
    const fetchPostList = async () => {
      const status = tab === "post" ? "posted" : "pending";
      await getCoursePostAPI(idCourse, { status }, dispatch);
    };
    const fetchDocList = async () => {
      await getCourseDocList(idCourse, dispatch);
    };
    tab === "doc" ? fetchDocList() : fetchPostList();
  }, [idCourse, tab]);

  // Call API and update store HomePage
  const likePostHome = async (postId, userId) => {
    await likePost(postId, userId, dispatch);
  };

  const unLikePostHome = async (postId, userId) => {
    await unLikePost(postId, userId, dispatch);
  };

  const updateStatus = async (postId, status) => {
    await updateStatusPost(dispatch, postId, { status });
    setTab("post");
  };
  return (
    <div className="container mx-auto h-screen items-center self-center flex flex-col">
      <header className="header sticky top-0 w-full h-[10%] rounded-t-lg z-50">
        <Header />
      </header>
      <div className="main-content w-full h-[90%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg z-0">
        <div className="basis-1/5 w-1/5 max-h-full h-full sticky top-28 bg-white rounded-lg">
          <SideNav />
        </div>

        <div className="basis-3/5 max-w-[56%] overflow-hidden">
          <div className="flex justify-between bg-inherit my-3 sticky top-3 z-20">
            <span
              id="post"
              onClick={handleChangeTab}
              className={
                (tab === "post"
                  ? "border-primary-blue border-b-2 text-primary-blue"
                  : "text-gray-400 hover:bg-gray-200") + " py-1 w-full text-center text-lg font-semibold cursor-pointer"
              }
            >
              Bài Viết
            </span>
            <span
              id="doc"
              onClick={handleChangeTab}
              className={
                (tab === "doc"
                  ? "border-primary-blue border-b-2 text-primary-blue"
                  : "text-gray-400 hover:bg-gray-200 ") +
                " py-1 w-full text-center text-lg font-semibold cursor-pointer"
              }
            >
              Tài liệu
            </span>
            {user.role === "teacher" && (
              <span
                id="pending-post"
                onClick={handleChangeTab}
                className={
                  (tab === "pending-post"
                    ? "border-primary-blue border-b-2 text-primary-blue"
                    : "text-gray-400 hover:bg-gray-200 ") +
                  " py-1 w-full text-center text-lg font-semibold cursor-pointer"
                }
              >
                Bài viết chưa duyệt
              </span>
            )}
          </div>
          {tab !== "doc" ? (
            <div className="post-list h-[90%] px-3 overflow-y-auto">
              {postCourseList && postCourseList.length > 0 ? (
                postCourseList.map((postItem) => {
                  return (
                    <PostItem
                      key={postItem._id}
                      dataItem={postItem}
                      funcLikePost={likePostHome}
                      funcUnLikePost={unLikePostHome}
                      updateStatus={updateStatus}
                    />
                  );
                })
              ) : (
                <div className="flex justify-center">
                  <span className="font-semibold text-lg mt-16 text-blue-800">Chưa có bài viết nào</span>
                </div>
              )}
            </div>
          ) : (
            <div className="post-list px-3 h-[90%] overflow-y-auto">
              {docCourseList && docCourseList.length > 0 ? (
                docCourseList.map((docItem) => {
                  return (
                    <div className="flex items-center justify-between">
                      <p className="flex items-center gap-4">
                        <span>
                          <box-icon type="solid" name="file"></box-icon>
                        </span>
                        <span>{docItem.title}</span>
                      </p>
                      <span>{moment(docItem.createdAt).fromNow()}</span>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center">
                  <span className="font-semibold text-lg mt-16 text-blue-800">Chưa có tài liệu nào</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="basis-1/5 w-1/5 h-full max-h-full sticky top-28 bg-white rounded-lg z-1">
          <CourseInfoPane course={course} />
        </div>
      </div>
    </div>
  );
}
