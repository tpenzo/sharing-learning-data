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
function PostItem({
  dataItem,
  funcLikePost,
  funcUnLikePost,
  funcBookmarkPost,
  funcUnBookmarkPost,
}) {
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
      await funcBookmarkPost(dataItem._id, user._id);
    } else {
      await funcUnBookmarkPost(dataItem._id, user._id);
    }
    setSaved(!saved);
  };
  const handleRemovePost = async (check, postId, docs) => {
    console.log(check, postId, docs);
    if (check) {
      if (docs && docs.length > 0) {
        await removeDocs(docs);
      }
      await deletePost(dispatch, postId);
    }
  };
  const handleUpdateStatus = async (postId, status) => {
    await updateStatusPost(dispatch, postId, { status });
  };
  return (
    <div className="w-full bg-white pb-4 pt-1 px-6 rounded-lg mb-5 shadow-sm">
      <div className="flex items-center gap-4 justify-between mt-5 flex-wrap-reverse">
        <div className="flex items-center gap-4">
          <Link to={`/profile/${dataItem?.author._id}`}>
            <Wrap>
              <Avatar size="md" src={dataItem?.author.urlAvatar}></Avatar>
            </Wrap>
          </Link>
          <div>
            <Link to={`/profile/${dataItem?.author._id}`}>
              <p className="font-semibold">
                {dataItem?.author.fullName +
                  " " +
                  `${
                    dataItem.author.studentCode
                      ? dataItem?.author.studentCode
                      : dataItem?.author.teacherCode
                  }`}
              </p>
            </Link>
            <span className="font-light text-gray-500 text-xs">
              {moment(dataItem?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div className="flex relative">
          {dataItem?.author._id === user._id && (
            <span
              className="cursor-pointer"
              onClick={() => {
                setOptions(!options);
              }}
            >
              <box-icon name="dots-vertical-rounded"></box-icon>
            </span>
          )}
          {options && (
            <ul className="absolute top-12 right-0 bg-white shadow-xl flex rounded overflow-hidden">
              <li
                className="px-2 py-1 font-semibold cursor-pointer"
                onClick={onOpen}
              >
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
                className="px-2 py-1 font-semibold cursor-pointer"
                onClick={onOpenVerify}
              >
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
          <p className="px-2 py-1 text-sm rounded-lg bg-primary-blue text-white font-medium">
            {dataItem.course ? dataItem.course?.courseID : "Công khai"}
          </p>
        </div>
      </div>
      <Link to={`/post/${dataItem?._id}`}>
        <p className="mt-5 text-sm cursor-pointer hover:font-semibold">
          {dataItem?.title}
        </p>
      </Link>
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
            <span className="bg-gray-500/5 cursor-pointer py-1 px-1 rounded-lg flex items-center gap-2">
              <box-icon name="message-square-dots"></box-icon>
              <Link to={`/post/${dataItem?._id}`}>
                <span className="text-sm leading-4">Bình luận</span>
              </Link>
            </span>
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
