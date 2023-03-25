import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unLikePost } from "../../Api/postAPI";
import moment from "moment";
import { countDocs } from "../../utils/handleDoc";
import { Avatar, Wrap } from "@chakra-ui/react";
function PostItem(props) {
  const { dataItem } = props;
  const { auth, document } = useSelector((state) => state);
  const { user } = auth;
  const { docs } = document;
  const [loved, setLoved] = useState(() => {
    if (dataItem?.likes) {
      return [...dataItem?.likes].some((id) => id === user._id);
    }
  });
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();
  const handleLovedPost = async () => {
    setLoved(!loved);
    if (!loved) {
      await likePost(dataItem._id, user._id, dispatch);
    } else {
      await unLikePost(dataItem._id, user._id, dispatch);
    }
  };
  return (
    <div className="w-full bg-white pb-4 pt-1 px-6 rounded-lg mb-5 shadow-sm">
      <div className="flex items-center gap-4 justify-between mt-5 flex-wrap-reverse">
        <div className="flex items-center gap-4">
          <Wrap>
            <Avatar size='md' src={dataItem?.author.urlAvatar}></Avatar>
          </Wrap>
          <div>
            <p className="font-semibold">
              {dataItem?.author.fullName + " " + dataItem?.author.studentCode}
            </p>
            <span className="font-light text-gray-500 text-xs">
              {moment(dataItem?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <p className="px-2 py-1 text-sm rounded-lg bg-primary-blue text-white font-medium">
          CT244
        </p>
      </div>
      <Link to={`/post/${dataItem?._id}`}>
        <p className="mt-5 text-sm cursor-pointer hover:font-semibold">
          {dataItem?.title}
        </p>
      </Link>
      <div className="flex items-end">
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
            onClick={() => {
              setSaved(!saved);
            }}
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
