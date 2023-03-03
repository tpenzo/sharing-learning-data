import React, { useState } from "react";
import ReplyComment from "./ReplyComment";
function Comment() {
  const [loved, setLoved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [moreClicked, setMoreClicked] = useState(false);

  const handleLoveComment = () => {
    setLoved(!loved);
    //api handle
  };
  return (
    <div className="comment mt-6 flex flex-row items-start justify-center">
      <div className="avatar w-10 h-10 mx-5 bg-gray-700 rounded-full"></div>
      <div className="content-area w-10/12">
        <div className="w-full relative mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="info-cmt pr-3 flex flex-row justify-start items-center self-end">
            <div className="user-name ml-2 font-semibold text-base p-2">
              Nguyễn Văn ABCDEF
            </div>
            <div className="cmt-date ml-2 text-sm text-gray-700">
              10 giờ trước
            </div>
            <div
              onClick={() => setMoreClicked(!moreClicked)}
              className="more p-1 flex items-center ml-auto hover:bg-gray-300 rounded-lg cursor-pointer"
            >
              <box-icon name="dots-horizontal-rounded"></box-icon>
            </div>
          </div>
          <div className="cmt-content text-base py-2 px-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
            aspernatur odio quasi eius sit est dolores, obcaecati harum quisquam
            repudiandae aperiam quo rem magni error, non veritatis neque
            eligendi assumenda. Lorem ipsum dolor sit amet consectetur
          </div>

          {/* more menu */}
          {moreClicked && (
            <div className="more-menu w-1/4 absolute  top-10 -right-10 shadow-xl rounded-xl bg-white">
              <div className="px-1 py-2 hover:bg-gray-200 rounded-t-xl cursor-pointer">
                Xoá
              </div>
              <div className="px-1 py-2 hover:bg-gray-200 rounded-b-xl cursor-pointer">
                Chỉnh sửa
              </div>
            </div>
          )}
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
            <span className="ml-1">12</span>
          </div>
          <div
            onClick={() => setIsReply(!isReply)}
            className="reply flex flex-row item-center ml-3 scale-90 hover:underline cursor-pointer"
          >
            <box-icon name="message-square"></box-icon>
            <span className="">Trả lời</span>
          </div>
          <div
            title={expanded ? "Thu gọn" : "Mở rộng"}
            onClick={() => setExpanded(!expanded)}
            className="expand flex flex-row item-center ml-2 hover:underline cursor-pointer"
          >
            <box-icon
              size="xs"
              name={expanded ? "collapse-vertical" : "expand-vertical"}
            ></box-icon>
            <box-icon name=""></box-icon>
          </div>
        </div>

        {/* reply form */}
        {isReply && (
          <div className="reply-comment mt-3 flex justify-end items-center flex-col">
            <form className="w-full">
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                  <label htmlFor="reply" className="sr-only"></label>
                  <textarea
                    id="reply"
                    rows="2"
                    className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 focus:border-transparent focus:outline-none"
                    placeholder="Trả lời..."
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-end px-2 py-2">
                  <button
                    type="submit"
                    className="inline-flex items-center py-1.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {/* reply comment area */}
        {expanded && (
          <div className="reply-comment scale-80 flex justify-start items-center flex-col">
            <ReplyComment />
            <ReplyComment />
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
