import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createCmtAPI, replyCmtAPI } from '../../Api/commentAPI';

export default function CommentInput({ isReply, cmtDadId }) {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user);
    const post = useSelector((state) => state.post.postItem);

    const [content, setContent] = useState('')

    // const newReply = await replyCmt({ content, idCmtReply })

    const handleSubmit = async () => {
        if (content) {
            if (isReply) {
                await replyCmtAPI({ content, idCmtReply: cmtDadId }, cmtDadId, dispatch)
            } else {
                await createCmtAPI({ content, postId: post._id }, dispatch)
            }
            setContent('')
        }
    }

    return (
        <div className="input-comment mt-5 flex flex-row items-start justify-center">
            <img className="avatar w-0 h-10 mx-5 bg-gray-700 rounded-full" src={user?.urlAvatar}></img>
            <div className="input-area w-10/12">
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="px-4 py-2 bg-white rounded-t-lg">
                        <label htmlFor="comment" className="sr-only"></label>
                        <textarea
                            id="comment"
                            rows="2"
                            className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 focus:border-transparent focus:outline-none"
                            placeholder="Thêm bình luận..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end px-3 py-2 border-t">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                        >
                            Thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
