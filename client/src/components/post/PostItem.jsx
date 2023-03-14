import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function PostItem(props) {
  const { dataItem, handleLovedPost } = props;
  const user = useSelector((state) => state.auth.user);
  const [loved, setLoved] = useState(() => {
    if (dataItem) {
      return [...dataItem.likes].some((id) => id === user._id);
    }
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = () => {
    setLoved(!loved);
    //api
    if (!loved) {
      handleLovedPost(dataItem._id, loved, user._id);
    } else {
      handleLovedPost(dataItem._id, loved, user._id);
    }
  };

  return (
    <div className="w-full bg-white pb-4 pt-1 px-6 rounded-lg mb-5 shadow-sm">
      <div className="flex items-center gap-4 justify-between mt-5 flex-wrap-reverse">
        <div className="flex items-center gap-4">
          <figure>
            <img
              className="w-12 rounded"
              src={dataItem.author.urlAvatar}
              alt=""
            />
          </figure>
          <div>
            <p className="font-semibold">
              {dataItem.author.fullName + " " + dataItem.author.studentCode}
            </p>
            <span className="font-light text-gray-500 text-xs">
              {dataItem.createdAt}
            </span>
          </div>
        </div>
        <p className="px-2 py-1 text-sm rounded-lg bg-primary-blue text-white font-medium">
          CT244
        </p>
      </div>
      <Link to={`/post/${dataItem._id}`}>
        <p className="mt-5 text-sm cursor-pointer hover:font-semibold">
          {dataItem.title}
        </p>
      </Link>
      <div className="mt-5 flex items-center gap-5 md:gap-2">
        <p
          className="bg-gray-500/5 cursor-pointer pt-1 px-1 rounded-lg flex items-center"
          onClick={handleToggle}
        >
          <span className="text-sm leading-4">
            {dataItem.likes.length > 0 ? dataItem.likes.length : null}
          </span>
          <box-icon
            name="heart"
            type={loved ? "solid" : "regular"}
            color={loved ? "red" : "black"}
          ></box-icon>
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
          <span className="text-sm leading-4">Bình luận</span>
        </span>
      </div>
    </div>
  );
}

export default PostItem;
