import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { fetchCmtsAPI } from "../../Api/commentAPI";
import { useSelector } from "react-redux";
import CommentInput from "./CommentInput.jsx";
import { countCmt } from "../../utils/handleCmt";
function CommentList() {

	const post = useSelector((state) => state.post.postItem);
	const comments = useSelector((state) => state.post.commentsPostItem);

	console.log(comments)

	return (
		<div className="px-6">
			<span className="block text-2xl mt-4 font-bold">Bình luận ({ countCmt(comments) })</span>
			<CommentInput />
			<div className="list-comment">
				{
					comments.map(comment =>
						<Comment
							comment={comment}
							authorId={post?.author._id}
							key={comment._id}
						/>
					)
				}
			</div>
		</div>
	);
}
export default CommentList;
