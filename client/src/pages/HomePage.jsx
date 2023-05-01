import React, { useEffect, useState } from "react";
import SideNav from "../components/navigation/SideNav";
import InfoPane from "../components/sidepane/InfoPane";
import PostItem from "../components/post/PostItem";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, likePost, unLikePost, updateStatusPost } from "../Api/postAPI";
import { Box, SkeletonCircle, SkeletonText, Spinner, Button } from "@chakra-ui/react";
import { addBookmarkAPI, unBookmarkAPI } from "../Api/userAPI";
export default function HomePage() {
  const { postList, totalPost } = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth.user);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("posted");
  const dispatch = useDispatch();

  const handleChangeTab = (e) => {
    setTab(e.target.id);
  };

  useEffect(() => {
    const fetchPostList = async () => {
      setLoading(true);
      await getAllPost({ page, status: tab }, dispatch);
      setLoading(false);
    };

    fetchPostList();
  }, [page, tab]);

  // Call API and update store HomePage
  const likePostHome = async (postId, userId) => {
    await likePost(postId, userId, dispatch);
  };

  const unLikePostHome = async (postId, userId) => {
    await unLikePost(postId, userId, dispatch);
  };

  // Call API and update store HomePage
  const bookmarkPostHome = async (post) => {
    await addBookmarkAPI(post, dispatch);
  };

  const unBookmarkPostHome = async (post) => {
    await unBookmarkAPI(post, dispatch);
  };

  const updateStatus = async (postId, status) => {
    await updateStatusPost(dispatch, postId, { status });
    setTab("posted");
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
        <div className="basis-3/5 max-w-[56%] px-3 overflow-y-auto">
          {user.role === "teacher" && (
            <div className="flex justify-between bg-inherit my-3 sticky top-0 z-20">
              <span
                id="posted"
                onClick={handleChangeTab}
                className={
                  (tab === "posted"
                    ? "border-primary-blue border-b-2 text-primary-blue"
                    : "text-gray-400 hover:bg-gray-200") +
                  "py-1 w-full text-center text-lg font-semibold cursor-pointer text-gra relative flex items-center justify-center gap-2 rounded-lg bg-white px-3 shadow hover:bg-white hover:text-gray-700 mr-2"
                }
              >
                Bài Viết
              </span>

              <span
                id="pending"
                onClick={handleChangeTab}
                className={
                  (tab === "pending"
                    ? "border-primary-blue border-b-2 text-primary-blue"
                    : "text-gray-400 hover:bg-gray-200 ") +
                  "py-1 w-full text-center text-lg font-semibold cursor-pointer text-gra relative flex items-center justify-center gap-2 rounded-lg bg-white px-3 shadow hover:bg-white hover:text-gray-700"
                }
              >
                Bài viết chưa duyệt
              </span>
            </div>
          )}
          {tab === "posted" ? (
            postList && postList.length > 0 ? (
              postList.map((postItem) => {
                return (
                  <PostItem
                    key={postItem._id}
                    dataItem={postItem}
                    funcLikePost={likePostHome}
                    funcUnLikePost={unLikePostHome}
                    funcBookmarkPost={bookmarkPostHome}
                    funcUnBookmarkPost={unBookmarkPostHome}
                  />
                );
              })
            ) : (
              <div>
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
                </Box>
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
                </Box>
              </div>
            )
          ) : postList && postList.length > 0 ? (
            postList.map((postItem) => {
              return (
                <PostItem
                  key={postItem._id}
                  dataItem={postItem}
                  funcLikePost={likePostHome}
                  funcUnLikePost={unLikePostHome}
                  funcBookmarkPost={bookmarkPostHome}
                  funcUnBookmarkPost={unBookmarkPostHome}
                  updateStatus={updateStatus}
                />
              );
            })
          ) : (
            <p className="text-center mt-8">Không có bài viết nào</p>
          )}
          {postList.length > 0 && (
            <div className="pb-4 flex items-center justify-center">
              {totalPost <= postList.length ? (
                <Button
                  isLoading={loading}
                  onClick={() => {
                    setPage((page) => page - 1);
                  }}
                  colorScheme="blue"
                  isDisabled={page <= 0}
                >
                  Ẩn bớt
                </Button>
              ) : (
                <Button
                  isLoading={loading}
                  onClick={() => {
                    setPage((page) => page + 1);
                  }}
                  colorScheme="blue"
                  isDisabled={totalPost <= postList.length}
                >
                  Xem thêm
                </Button>
              )}
            </div>
          )}
        </div>
        <div className=" basis-1/5 w-1/5 h-full max-h-full sticky top-28 bg-white rounded-lg z-1">
          <InfoPane />
        </div>
      </div>
    </div>
  );
}
