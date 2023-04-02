import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { countDocs } from "../../utils/handleDoc";
import { Avatar, Wrap } from "@chakra-ui/react";

function PostItem({ dataItem, funcLikePost, funcUnLikePost }) {

  const { auth, document } = useSelector((state) => state);
  const { user } = auth;

  const [loved, setLoved] = useState(false);

  useEffect(() => {
    if (dataItem?.likes) {
      let isLove = [...dataItem?.likes].some((id) => id === user._id);
      console.log(isLove)
      setLoved(isLove)
    }
  }, [dataItem])


  const [saved, setSaved] = useState(false);

  const handleLovedPost = async () => {
    if (!loved) {
      await funcLikePost(dataItem._id, user._id);
    } else {
      await funcUnLikePost(dataItem._id, user._id);
    }
    setLoved(!loved);
  };

  return (
    <div className="w-full bg-white pb-4 pt-1 px-6 rounded-lg mb-5 shadow-sm">
      <div className="flex items-center gap-4 justify-between mt-5 flex-wrap-reverse"> 
        <div className="flex items-center gap-4">
          <Link to={`/profile/${dataItem?.author._id}`}>
            <Wrap>
              <Avatar size='md' src={dataItem?.author.urlAvatar}></Avatar>
            </Wrap>
          </Link>
          <div>
            <Link to={`/profile/${dataItem?.author._id}`}>
              <p className="font-semibold">
                {dataItem?.author.fullName + " " + `${dataItem.author.studentCode ? dataItem?.author.studentCode : dataItem?.author.teacherCode}`}
              </p>
            </Link>
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
