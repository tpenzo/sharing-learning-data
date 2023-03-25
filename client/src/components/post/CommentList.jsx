import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { fetchCmtsAPI } from "../../Api/commentAPI";
import { useSelector } from "react-redux";
import CommentInput from "./CommentInput.jsx";
import { countCmt } from "../../utils/handleCmt";
function CommentList() {
  const post = useSelector((state) => state.post.postItem);
  const comments = useSelector((state) => state.post.commentsPostItem);

  console.log(comments);

  return (
    <div className="px-6">
      <span className="block text-2xl mt-4 font-bold">
        Bình luận ({countCmt(comments)})
      </span>
      <CommentInput />
      <div className="list-comment">
        {comments &&
          comments.length > 0 ?
          comments.map((comment) => (
            <Comment
              comment={comment}
              authorId={post?.author?._id}
              key={comment._id}
            />
          ))
        :(
          <div className="text-center mt-10 text-lg text-gray-400 font-semibold mx-auto">
            Chưa có bình luận nào
          </div>
        )}
      </div>
      
    </div>
  );
}
export default CommentList;
