import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { deleteCmtAPI, likeCmtAPI, unLikeCmtAPI, updateCmtAPI } from "../../Api/commentAPI";
import CommentInput from "./CommentInput";
import { Avatar, Wrap } from "@chakra-ui/react";

function Comment({ comment, authorId, reply, cmtDadId }) {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user);

    const [loved, setLoved] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isReply, setIsReply] = useState(false);
    const [moreClicked, setMoreClicked] = useState(false);
    // Edit
    const [isEdit, setIsEdit] = useState(false)
    const [content, setContent] = useState(comment?.content)

    useEffect(() => {
        setContent(comment?.content)
    }, [comment?.content])

    // Like comment
    const handleLoveComment = async () => {
        if (!loved) {
            await likeCmtAPI(comment?._id, user._id, cmtDadId, dispatch)
        } else {
            await unLikeCmtAPI(comment?._id, user._id, cmtDadId, dispatch)
        }
        setLoved(!loved);
    };

    const handleDeleteCmt = async () => {
        await deleteCmtAPI(comment._id, cmtDadId, dispatch)
    }

    const handleEditCmt = async () => {
        if (content !== comment?.content)
            await updateCmtAPI(comment._id, content, cmtDadId, dispatch)
        setIsEdit(!isEdit)
    }

    useEffect(() => {
        if (comment?.likes.find((item) => item === user?._id)) {
            setLoved(!loved); // Love
        }
    }, [])


    return (
        <div className="comment mt-6 flex flex-row items-start justify-center">
            <Wrap>
                <Avatar size='md' src={comment?.user.urlAvatar}/>
            </Wrap>
            <div className="content-area ml-2 w-10/12">
                <div className={`${reply ? 'w-[565px]' : 'w-full'} relative mb-4 border border-gray-200 rounded-lg bg-gray-50`}>
                    <div className="info-cmt pr-3 flex flex-row justify-start items-center self-end">
                        <div className="user-name ml-2 font-semibold text-base p-2">
                            {comment?.user.fullName} {comment?.user.studentCode || comment?.user.teacherCode}
                        </div>
                        <div className="cmt-date ml-2 text-xs text-gray-600">
                            {moment(comment?.createdAt).fromNow()}
                        </div>
                        {
                            (authorId === user._id || comment?.user._id === user._id) &&
                            <div
                                onClick={() => setMoreClicked(!moreClicked)}
                                className="more p-1 flex items-center ml-auto hover:bg-gray-300 rounded-lg cursor-pointer"
                            >
                                <box-icon name="dots-horizontal-rounded"></box-icon>
                            </div>
                        }
                    </div>
                    <div className="cmt-content text-base py-2 px-4">
                        {
                            isEdit ?
                                <div className="px-4 py-2 bg-white rounded-t-lg">
                                    <textarea
                                        id="comment"
                                        rows="2"
                                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 focus:border-transparent focus:outline-none"
                                        placeholder="Sửa bình luận..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    ></textarea>
                                    <div className="flex">
                                        <div className="cursor-pointer"
                                            onClick={() => setIsEdit(!isEdit)} >
                                            <box-icon name='user-x'></box-icon>
                                        </div>
                                        <div className="cursor-pointer ml-2"
                                            onClick={handleEditCmt}>
                                            <box-icon name='user-check'></box-icon>
                                        </div>
                                    </div>
                                </div>
                                : comment?.content
                        }
                    </div>

                    {/* more menu */}
                    {
                        moreClicked &&
                        <div className="more-menu w-1/4 absolute  top-10 -right-10 shadow-xl rounded-xl bg-white">
                            <div className="px-1 py-2 hover:bg-gray-200 rounded-t-xl cursor-pointer pl-3"
                                onClick={handleDeleteCmt}>
                                <span className="ml-2">Xóa</span>
                            </div>
                            <div className="px-1 py-2 hover:bg-gray-200 rounded-b-xl cursor-pointer pl-3"
                                onClick={() => { setIsEdit(!isEdit), setMoreClicked(!moreClicked) }}>
                                <span className="ml-2">Chỉnh sửa</span>
                            </div>
                        </div>
                    }
                </div>

                {/* cmt tool */}
                <div className="w-full flex -mt-2 ml-1 flex-row items-start">
                    <div
                        onClick={handleLoveComment}
                        className="like flex flex-row item-center cursor-pointer"
                    >
                        <box-icon
                            type={loved ? "solid" : "regular"}
                            color={loved ? "red" : "black"}
                            name="heart"
                        ></box-icon>
                        <span className="ml-1">{comment?.likes.length}</span>
                    </div>
                    <div
                        onClick={() => setIsReply(!isReply)}
                        className="reply flex flex-row item-center ml-3 scale-90 hover:underline cursor-pointer"
                    >
                        <box-icon name="message-square"></box-icon>
                        <span className="">Trả lời</span>
                    </div>
                    {
                        !reply &&
                        <div
                            title={expanded ? "Thu gọn" : "Mở rộng"}
                            onClick={() => setExpanded(!expanded)}
                            className="expand flex flex-row item-center ml-2 hover:underline cursor-pointer relative"
                        >
                            <box-icon
                                size="xs"
                                name={expanded ? "collapse-vertical" : "expand-vertical"}
                            ></box-icon>
                            {
                                comment?.reply.length !== 0 &&
                                <span className="absolute -top-1 -right-3.5 px-1 rounded-full bg-red-600 text-white text-xs">
                                    {comment?.reply.length}
                                </span>
                            }
                        </div>
                    }
                </div>


                {/* reply form */}
                {isReply && (<CommentInput isReply={true} cmtDadId={reply ? cmtDadId : comment._id} setIsReply={setIsReply}/>)}


                {/* reply comment area */}
                {expanded && (
                    <div className="reply-comment scale-20 flex justify-start items-center flex-col">
                        {
                            comment?.reply.map(commentReply =>
                                <Comment
                                    // render
                                    comment={commentReply}
                                    authorId={authorId}
                                    key={commentReply._id}
                                    // 2nd
                                    reply={true}
                                    cmtDadId={comment._id}
                                />
                            )
                        }

                        {/* <div ref={bottomCommentRef} className="bottomComment"></div> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;
