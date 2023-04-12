import React, { useEffect, useState } from "react";
import SideNav from "../components/navigation/SideNav";
import InfoPane from "../components/sidepane/InfoPane";
import PostItem from "../components/post/PostItem";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost, likePost, unLikePost } from "../Api/postAPI";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { addBookmarkAPI, unBookmarkAPI } from "../Api/userAPI";
export default function HomePage() {
  const { postList, totalPost } = useSelector((state) => state.post);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPostList = async () => {
      setLoading(true);
      await getAllPost({ page }, dispatch);
      setLoading(false);
    };

    fetchPostList();
  }, [page]);

  // Call API and update store HomePage
  const likePostHome = async (postId, userId) => {
    await likePost(postId, userId, dispatch);
  };

  const unLikePostHome = async (postId, userId) => {
    await unLikePost(postId, userId, dispatch);
  };

  // Call API and update store HomePage
  const bookmarkPostHome = async (postId) => {
    await addBookmarkAPI(postId, dispatch);
  };

  const unBookmarkPostHome = async (postId) => {
    await unBookmarkAPI(postId, dispatch);
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
          {postList && postList.length > 0 ? (
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
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={3}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            </div>
          )}

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
        </div>
        <div className=" basis-1/5 w-1/5 h-full max-h-full sticky top-28 bg-white rounded-lg z-1">
          <InfoPane />
        </div>
      </div>
    </div>
  );
}
