import React from "react";
import Comment from "./Comment";
function CommentList() {
  return (
    <div className="px-6">
      <span className="block text-2xl mt-4 font-bold">Bình luận (1200)</span>
      <div className="input-comment mt-4 flex flex-row items-start justify-center">
        <div className="avatar w-10 h-10 mx-5 bg-gray-700 rounded-full"></div>
        <div className="input-area w-10/12">
          <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="px-4 py-2 bg-white rounded-t-lg">
                <label htmlFor="comment" className="sr-only"></label>
                <textarea
                  id="comment"
                  rows="4"
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 focus:border-transparent focus:outline-none"
                  placeholder="Thêm bình luận..."
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-end px-3 py-2 border-t">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                >
                  Thêm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="list-comment">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
}
export default CommentList;
