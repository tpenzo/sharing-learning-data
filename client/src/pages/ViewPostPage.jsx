import React, { useState, useRef, useEffect } from "react";
import parse from "html-react-parser";
import SideNav from "../components/navigation/SideNav";
import InfoPane from "../components/sidepane/InfoPane";
import Header from "../components/header/Header";
import CommentList from "../components/post/CommentList";
import { useParams } from "react-router-dom";
import { getPostById, likePost, unLikePost } from "../Api/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from '@chakra-ui/react'
import { countCmt } from "../utils/handleCmt";
// import QuillEditor from "../components/form/QuillEditor";

export default function ViewPostPage() {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const post = useSelector((state) => state.post.postItem);
  const comments = useSelector((state) => state.post.commentsPostItem);

  const [lovedPost, setLovedPost] = useState(() => {
    if (post?.likes) {
      return [...post?.likes].some((id) => id === user._id);
    }
  });
  // const [readOnly, setReadOnly] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const CommentListRef = useRef(null);

  const handleLovedPost = async () => {
    setLovedPost(!lovedPost);
    //api
    if (!lovedPost) {
      await likePost(postId, user._id, dispatch);
    } else {
      await unLikePost(postId, user._id, dispatch);
    }
  };

  const handleBookmarkPost = () => {
    setBookmarked(!bookmarked);
    //api
  };

  const handleScrollComment = () => {
    CommentListRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const fetchPost = async (id) => {
    await getPostById(id, dispatch);
  };
  useEffect(() => {
    if (postId !== post?._id)
      fetchPost(postId);
  }, [postId]);

  return (
    <div className="container xl mx-auto h-screen items-center self-center flex flex-col scroll-smooth">
      {/* header */}
      <header className="header sticky top-0 w-full h-[10%] max-h-full rounded-t-lg z-50">
        <Header />
      </header>

      {/* content */}
      <div className="main-content w-full h-[90%] pt-4 flex flex-row justify-start gap-5 bg-white/60 rounded-b-lg z-0">
        {/* sidenav */}
        <div className="basis-1/5 max-w-[20%] max-h-full h-full bg-white sticky top-28 bg-light-gray/70 rounded-lg">
          <SideNav />
        </div>

        {/* tool post */}
        <div className="basis-1/12 w-[4%] overflow-y-auto">
          <div className="post-tools flex flex-col items-center bg-inherit mt-3 ml-2">
            <div
              onClick={handleLovedPost}
              className="like flex flex-col items-center justify-center  rounded-lg py-2 px-4 cursor-pointer"
            >
              <span>
                <box-icon
                  color={lovedPost ? "red" : "black"}
                  type={lovedPost ? "solid" : "regular"}
                  size="md"
                  name="heart"
                ></box-icon>
              </span>
              <span className="text-black">
                {post?.likes?.length > 0 ? post?.likes?.length : null}
              </span>
            </div>
            <div
              onClick={handleScrollComment}
              className="like flex flex-col items-center justify-center rounded-lg py-2 px-4 cursor-pointer"
            >
              <box-icon size="md" name="message-square-dots"></box-icon>
              <span>{countCmt(comments)}</span>
            </div>
            <div
              onClick={handleBookmarkPost}
              className="like flex flex-col items-center justify-center rounded-lg py-2 px-4 cursor-pointer"
            >
              <box-icon
                type={bookmarked ? "solid" : "regular"}
                size="md"
                name="bookmark"
              ></box-icon>
              <span>149</span>
            </div>
            <div
              size="md"
              className="like flex flex-col items-center justify-center hover:bg-gray-300 rounded-full py-2 px-2 cursor-pointer"
            >
              <box-icon name="dots-horizontal-rounded"></box-icon>
            </div>
          </div>
        </div>

        {/* post view */}
        <div className=" basis-4/6 h-full max-h-full sticky self-start bg-white rounded-lg z-1 overflow-y-auto">
          <div className="h-full scroll-smooth">
            <div id="post" className="post-content h-screen">
              <h1 className="text-center font-bold text-2xl my-4">
                {post?.title}
              </h1>
              <div className="pl-4 pr-4 h-screen text-justify">
                {post?.content
                  ? parse(post ? String(post?.content) : " ")
                  :
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                }
              </div>
            </div>
            <hr />
            <div id="comment" ref={CommentListRef} className="comment h-screen">
              <CommentList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
