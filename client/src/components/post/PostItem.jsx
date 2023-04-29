import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Avatar, Wrap, useDisclosure, Button } from "@chakra-ui/react";
import ModalInstance from "../modal/ModalInstance";
import VerifyModal from "../modal/VerifyModal";
import FormPost from "../form/FormPost";
import { removeDocs } from "../../utils/uploadDocs";
import { deletePost, updateStatusPost } from "../../Api/postAPI";
import { useLocation } from 'react-router-dom';

function PostItem({
  dataItem,
  funcLikePost,
  funcUnLikePost,
  funcBookmarkPost,
  funcUnBookmarkPost,
}) {
  const location = useLocation();

  const { auth } = useSelector((state) => state);
  const { user } = auth;


  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);
  const [options, setOptions] = useState(false);

  const {
    isOpen: isOpenVerify,
    onClose: onCloseVerify,
    onOpen: onOpenVerify,
  } = useDisclosure();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (dataItem?.likes) {
      let isLove = [...dataItem?.likes].some((id) => id === user._id);
      setLoved(isLove);
    }
  }, [dataItem]);

  useEffect(() => {
    if (user?.bookmarkPost) {
      let isSave = [...user?.bookmarkPost].some((id) => id === dataItem._id);
      setSaved(isSave);
    }
  }, [dataItem]);

  const handleLovedPost = async () => {
    if (!loved) {
      await funcLikePost(dataItem._id, user._id);
    } else {
      await funcUnLikePost(dataItem._id, user._id);
    }
    setLoved(!loved);
  };

  const handleSavedPost = async () => {
    if (!saved) {
      await funcBookmarkPost(dataItem, user._id);
    } else {
      await funcUnBookmarkPost(dataItem, user._id);
    }
    setSaved(!saved);
  };

  const handleRemovePost = async (check, postId, docs) => {
    if (check) {
      if (docs && docs.length > 0) {
        await removeDocs(docs);
      }
      let position = "home"
      if(location.pathname.includes("/courses")){
        position = "courses"
      } else if(location.pathname.includes("/profile")){
        position = "profile"
      } else {
        position = "home"
      }
      await deletePost(dispatch, postId, position);
    }
  };
  const handleUpdateStatus = async (postId, status) => {
    await updateStatusPost(dispatch, postId, { status });
  };

  return (
    <div className="w-full flex flex-col bg-white pb-4 pt-1 px-5 rounded-lg mb-5 shadow-sm h-auto">
      <div className="flex items-center gap-4 justify-between mt-5 flex-wrap-reverse">
        <div className="flex items-center gap-4">
          <Link to={`/profile/${dataItem?.author?._id}`}>
            <Wrap>
              <Avatar size="md" src={dataItem?.author?.urlAvatar}></Avatar>
            </Wrap>
          </Link>
          <div>
            <Link to={`/profile/${dataItem?.author?._id}`}>
              <p className="font-semibold">
                {dataItem?.author?.fullName +
                  " " +
                  `${
                    dataItem.author?.studentCode
                      ? dataItem?.author?.studentCode
                      : dataItem?.author?.teacherCode
                  }`}
              </p>
            </Link>
            <span className="font-light text-gray-500 text-xs">
              {moment(dataItem?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div className="flex relative items-center">
        <p className="px-2 py-1 text-sm rounded-lg bg-primary-blue text-white font-medium mr-1">
            {dataItem.course ? dataItem.course?.courseID : "Công khai"}
          </p>
        </div>
      </div>
      <div title={dataItem?.title} className="title">
      <Link to={`/post/${dataItem?._id}`}>
        <p className="mt-5 pl-1 text-base cursor-pointer hover:font-semibold  whitespace-nowrap overflow-ellipsis overflow-hidden">
          {dataItem?.title}
        </p>
      </Link>
      </div>
      { // tag
		!dataItem.course && (
			<div>
				<div
				className="mt-3 translate-y-2 text-[10px] inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border"
				>
				 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)', transform: '', msfilter: ''}}><path d="M17.868 4.504A1 1 0 0 0 17 4H3a1 1 0 0 0-.868 1.496L5.849 12l-3.717 6.504A1 1 0 0 0 3 20h14a1 1 0 0 0 .868-.504l4-7a.998.998 0 0 0 0-.992l-4-7zM16.42 18H4.724l3.145-5.504a.998.998 0 0 0 0-.992L4.724 6H16.42l3.429 6-3.429 6z" /></svg>
				<span className="ml-1">{dataItem.tag}</span>
				</div>
      </div>
		)
	  }
      <div className="flex items-end">
        {dataItem?.status === "posted" ? (
          <div className="w-full mt-5 flex items-center gap-5 md:gap-2">
            <p
              className="bg-gray-500/5 cursor-pointer pt-1 px-1 rounded-lg flex items-center"
              onClick={handleLovedPost}
            >
              <box-icon
                name="heart"
                type={loved ? "solid" : "regular"}
                color={loved ? "red" : "black"}
              ></box-icon>
              <span className="text-sm leading-4 ml-1">
                {dataItem?.likes.length > 0 ? dataItem?.likes.length : null}
              </span>
            </p>
            <span className="bg-gray-500/5 cursor-pointer py-1 px-1 rounded-lg flex items-center gap-2">
              <box-icon name="message-square-dots"></box-icon>
              <Link to={`/post/${dataItem?._id}`}>
                <span className="text-sm leading-4">Bình luận</span>
              </Link>
            </span>
            <span
              className="bg-gray-500/5 cursor-pointer pt-1 px-1 rounded-lg flex items-center"
              onClick={handleSavedPost}
            >
              <box-icon
                name="bookmark"
                type={saved ? "solid" : "regular"}
                // color={saved ? "yellow" : "black"}
              ></box-icon>
            </span>
            
            <div className="relative">
            {options && (
            <ul className="absolute top-12 mt-1 right-0 w-36 bg-white shadow-2xl rounded-xl flex flex-col items-start justify-start overflow-hidden z-50">
              <li
                className="w-full px-3 py-2 font-semibold cursor-pointer flex items-center justify-between hover:bg-gray-200"
                onClick={onOpen}
              >
                <span className="mr-2">Chỉnh sửa</span>
                <box-icon name="edit-alt"></box-icon>
              </li>
              <ModalInstance
                isOpen={isOpen}
                onClose={onClose}
                modalName="Chỉnh sửa bài viết"
                modalBody={
                  <FormPost onClose={onClose} isEdit={true} post={dataItem} />
                }
              />
              <li
                className="w-full px-3 py-2 font-semibold cursor-pointer flex items-center justify-between hover:bg-gray-200"
                onClick={onOpenVerify}
              >
                <span className="mr-2">Xoá</span>
                <box-icon name="trash-alt"></box-icon>
              </li>
              <ModalInstance
                isOpen={isOpenVerify}
                onClose={onCloseVerify}
                modalName="Xác nhận"
                modalBody={
                  <VerifyModal
                    title="Xóa bài viết này?"
                    hide={onCloseVerify}
                    handleVerify={handleRemovePost}
                    selectedId={dataItem._id}
                    docs={dataItem.docs}
                  />
                }
              />
            </ul>
          )}
          {dataItem?.author?._id === user._id && (
            <span
              className={`cursor-pointer flex items-center rounded-lg p-1 ${options ? "bg-gray-200" :"bg-inherit"}`}
              onClick={() => {
                setOptions(!options);
              }}
            >
              <box-icon name="dots-vertical-rounded"></box-icon>
            </span>
          )}
            </div>
          </div>
        ) : user?.role !== "student" && dataItem.course ? (
          <div className="flex gap-2 mt-4">
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={() => {
                handleUpdateStatus(dataItem._id, "posted");
              }}
            >
              Duyệt
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                handleUpdateStatus(dataItem._id, "deny");
              }}
            >
              Từ chối
            </Button>
          </div>
        ) : null}

        {dataItem?.docs?.length > 0 && (
          <Link to={`/post/${dataItem?._id}`}>
            <p className="flex items-center " title="Tệp đính kèm">
              <box-icon name="file"></box-icon>
              <span>{dataItem.docs.length}</span>
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default PostItem;
