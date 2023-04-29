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
  const user = useSelector((state) => state.auth.user);
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
  }, [userId, tab, user]);

  return (
    <div
      className={
        " pr-1 grid grid-cols-2 gap-2 py-2 px-1"
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
                <div className="flex justify-center p-20 text-lg text-gray-600 font-medium items-center translate-x-1/2">
                  Chưa lưu bài viết nào
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
                <div className="flex justify-center p-20 text-lg text-gray-600 font-medium items-center translate-x-1/2">
                   Chưa đăng bài viết nào
                </div>
            )}
        </>
      }
    </div>
  );
}
