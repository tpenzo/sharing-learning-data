import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: [],
  postCourseList: [],
  postItem: {},
  commentsPostItem: [],
  totalPost: null,
};

const PostSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {
      createNewPost: (state, actions) => {
         state.postList.unshift(actions.payload.data);
      },
      resetPostSlice: () => initialState,
      getPosts: (state, actions) => {
         state.postList = actions.payload.data.postList;
         state.totalPost = actions.payload.data.countPost;
      },

      getCoursePosts: (state, actions) => {
         state.postCourseList = actions.payload.data;
      },

      getPost: (state, actions) => {
         state.postItem = actions.payload.post;
         state.commentsPostItem = actions.payload.comments;
      },
      removePost: (state, actions) => {
         state.postList = state.postList.filter((post) => post._id !== actions.payload);
      },
      saveEditPost: (state, actions) => {
         state.postList = state.postList.map((post) => {
            if (post._id === actions.payload.postId) {
               return actions.payload.post;
            }
            return post;
         });
      },
      saveUpdateStatusPost: (state, actions) => {
         state.postCourseList = state.postCourseList.map((post) => {
            if (post._id === actions.payload.postId) {
               return actions.payload.post;
            }
            return post;
         });
      },
      addFavoriteList: (state, actions) => {
         const { postId, userId, res } = actions.payload;
         state.postList = state.postList.map((post) => {
            if (post._id === postId) {
               post?.likes.push(userId);
            }
            return post;
         });
         state.postItem = res.data;
      },

      removeFavoriteList: (state, actions) => {
         const { postId, userId, res } = actions.payload;
         state.postList = state.postList.map((post) => {
            if (post._id === postId) {
               post?.likes.pop(userId);
            }
            return post;
         });
         state.postItem = res.data;
      },

      // comment
      likeComment: (state, actions) => {
         const { cmtId, userId } = actions.payload;
         const updatedComments = state.commentsPostItem.map((item) => {
            if (item._id === cmtId) {
               return {
                  ...item,
                  likes: [...item.likes, userId],
               };
            }
            return item;
         });
         return { ...state, commentsPostItem: updatedComments };
      },

      unLikeComment: (state, actions) => {
         const { cmtId, userId } = actions.payload;
         const updatedComments = state.commentsPostItem.map((item) => {
            if (item._id === cmtId) {
               return {
                  ...item,
                  likes: [...item.likes.filter((like) => like !== userId)],
               };
            }
            return item;
         });
         return { ...state, commentsPostItem: updatedComments };
      },

      createComment: (state, actions) => {
         const updatedComments = [...state.commentsPostItem, actions.payload];
         return { ...state, commentsPostItem: updatedComments };
      },

      deleteComment: (state, actions) => {
         const updatedComments = state.commentsPostItem.filter(
            (item) => item._id !== actions.payload
         );
         return { ...state, commentsPostItem: updatedComments };
      },

      updateComment: (state, actions) => {
         const { cmtId, newContent } = actions.payload;
         const updatedComments = state.commentsPostItem.map((item) => {
            if (item._id === cmtId) {
               return {
                  ...item,
                  content: newContent,
               };
            }
            return item;
         });
         return { ...state, commentsPostItem: updatedComments };
      },

      // reply comment
      likeReplyComment: (state, actions) => {
         const { cmtId, cmtDadId, userId } = actions.payload;
         const updatedComments = state.commentsPostItem.map((item) => {
            if (item._id === cmtDadId) {
               return {
                  ...item,
                  reply: [
                     ...item.reply.map((item) =>
                        item._id === cmtId
                           ? { ...item, likes: [...item.likes, userId] }
                           : item
                     ),
                  ],
               };
            }
            return item;
         });
         return { ...state, commentsPostItem: updatedComments };
      },

      unLikeReplyComment: (state, actions) => {
         const { cmtId, cmtDadId, userId } = actions.payload;
         const updatedComments = state.commentsPostItem.map((item) => {
            if (item._id === cmtDadId) {
               return {
                  ...item,
                  reply: [
                     ...item.reply.map((item) =>
                        item._id === cmtId
                           ? {
                                ...item,
                                likes: [...item.likes.filter((id) => id !== userId)],
                             }
                           : item
                     ),
                  ],
               };
            }
            return item;
         });
         return { ...state, commentsPostItem: updatedComments };
      },

      createReplyComment: (state, actions) => {
         const { newReplyCmt, cmtDadId } = actions.payload;
         const updatedComments = state.commentsPostItem.map((item) => {
            if (item._id === cmtDadId) {
               return {
                  ...item,
                  reply: [...item.reply, newReplyCmt],
               };
            }
            return item;
         });
         console.log(updatedComments);
         return { ...state, commentsPostItem: updatedComments };
      },

      deleteReplyComment: (state, actions) => {
         const { cmtReplyId, cmtDadId } = actions.payload;
         const updatedComments = state.commentsPostItem.map((item) => {
            if (item._id === cmtDadId) {
               return {
                  ...item,
                  reply: [...item.reply.filter((iReply) => iReply._id !== cmtReplyId)],
               };
            }
            return item;
         });
         return { ...state, commentsPostItem: updatedComments };
      },

      updateReplyComment: (state, actions) => {
         const { cmtId, cmtDadId, newContent } = actions.payload;
         const updatedComments = state.commentsPostItem.map((item) => {
            if (item._id === cmtDadId) {
               return {
                  ...item,
                  reply: [
                     ...item.reply.map((item) =>
                        item._id === cmtId ? { ...item, content: newContent } : item
                     ),
                  ],
               };
            }
            return item;
         });
         return { ...state, commentsPostItem: updatedComments };
      },
      removePostCourseList: (state, actions) => {
         state.postCourseList = state.postCourseList.filter(
            (post) => post._id !== actions.payload
         );
      },
   },
});

export const {
   createNewPost,
   getPosts,
   getPost,
   getCoursePosts,
   addFavoriteList,
   removeFavoriteList,
   removePost,
   saveEditPost,
   saveUpdateStatusPost,
   removePostCourseList,

   // Comment
   likeComment,
   unLikeComment,
   deleteComment,
   createComment,
   updateComment,
   likeReplyComment,
   unLikeReplyComment,
   createReplyComment,
   deleteReplyComment,
   updateReplyComment,
   resetPostSlice,
} = PostSlice.actions;
export default PostSlice.reducer;
