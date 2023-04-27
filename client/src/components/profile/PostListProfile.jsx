import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserPost,
  getbookmarkPost,
  likePostInProfile,
  unLikePostInProfile,
} from "../../Api/postAPI";
import PostItem from "../post/PostItem";
import { addBookmarkAPI, unBookmarkAPI } from "../../Api/userAPI";

export default function PostListProfile({ tab }) {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const posts = useSelector((state) => state.profile.posts);
  const bookmarks = useSelector((state) => state.profile.bookmarks);

  // Call API and update store HomePage
  const likePostProfile = async (postId, userId) => {
    if(tab){ // tab bookmarks
        await likePostInProfile(postId, userId, dispatch, "bookmarks");
    } else{
        await likePostInProfile(postId, userId, dispatch);
    }
  };

  const unLikePostProfile = async (postId, userId) => {
    if(tab){ // tab bookmarks
        await unLikePostInProfile(postId, userId, dispatch, "bookmarks");
    } else{
        await unLikePostInProfile(postId, userId, dispatch);
    }
  };

  const bookmarkProfile = async (post) => {
    await addBookmarkAPI(post, dispatch);
  };

  const unBookmarkPProfile = async (post) => {
    await unBookmarkAPI(post, dispatch);
  };

  useEffect(() => {
    if(tab){
      getbookmarkPost(userId, dispatch)
    }else{
      getUserPost(userId, dispatch);
    }
  }, [userId, tab]);

  return (
    <div
      className={
        "mt-5 h-[60%] bg-gray-200/20 pr-1 grid grid-cols-2 gap-2 overflow-y-auto py-2 px-1" +
        `${
          posts.length / 2 > 1
            ? ""
            : " grid-rows-[repeat(2,minmax(200px,500px))] h-[63%] overflow-y-hidden"
        } `
      }
    >
      {
        tab ? 
        <>
          {bookmarks && bookmarks.length > 0 ? (
              bookmarks.map((post) => (
                <PostItem
                  key={post._id}
                  dataItem={post}
                  funcLikePost={likePostProfile}
                  funcUnLikePost={unLikePostProfile}
                  funcBookmarkPost={bookmarkProfile}
                  funcUnBookmarkPost={unBookmarkPProfile}
                />
              ))
            ) : (
                <div className="flex justify-center text-lg text-gray-600 font-medium items-center translate-y-5 translate-x-1/2">
                  Bạn chưa lưu bài viết nào
                </div>
            )}
        </>: 
        <>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <PostItem
                  key={post._id}
                  dataItem={post}
                  funcLikePost={likePostProfile}
                  funcUnLikePost={unLikePostProfile}
                  funcBookmarkPost={bookmarkProfile}
                  funcUnBookmarkPost={unBookmarkPProfile}
                />
              ))
            ) : (
                <div className="flex justify-center text-lg text-gray-600 font-medium items-center translate-y-5 translate-x-1/2">
                  Bạn chưa đăng bài viết nào
                </div>
            )}
        </>
      }
    </div>
  );
}
