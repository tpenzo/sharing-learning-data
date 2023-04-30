import axiosClient from './axiosClient';
import {
   createNewPost,
   getPosts,
   getPost,
   addFavoriteList,
   removeFavoriteList,
   getCoursePosts,
   removePost,
   saveEditPost,
   saveUpdateStatusPost,
   removePostCourseList,
   saveEditPostCourseList,
   createNewPostCourseList,
} from '../redux/PostSlice';
import showToast from './showToast';
import { fetchCmtsAPI } from './commentAPI';
import {
   createNewPostProfile,
   getBookmarksUser,
   getPostsUser,
   likePostProfile,
   removePostProfile,
   saveEditPostsProfile,
   unLikePostProfile,
} from '../redux/ProfileSlice';
import { getCourseAPI } from './coursesAPI';

export const createPost = async (payload, dispatch) => {
   try {
      const res = await axiosClient.post('/api/post/newpost', payload);
      if (!res.data.course) {
         await dispatch(createNewPost(res));
         await dispatch(createNewPostProfile(res));
         showToast('Tạo bài viết thành công!', 'success');
      } else {
         await dispatch(createNewPostCourseList(res));
         showToast('Tạo bài viết thành công!', 'success');
      }
      return res;
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};
export const deletePost = async (dispatch, postId, position) => {
   try {
      const res = await axiosClient.delete(`/api/post/${postId}`);

      if (position === 'courses') {
         dispatch(removePostCourseList(postId));
      } else if (position === 'profile') {
         dispatch(removePostProfile(postId));
      } else {
         dispatch(removePost(postId));
      }
      showToast(res.message, 'success');
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};
export const editPost = async (payload, dispatch, postId, position = 'home') => {
   try {
      const res = await axiosClient.put(`/api/post/${postId}`, payload);

      if (position === 'courses') {
         await dispatch(saveEditPostCourseList({ postId, post: res.data }));
      } else if (position === 'profile') {
         await dispatch(saveEditPostsProfile({ postId, post: res.data }));
      } else {
         await dispatch(saveEditPost({ postId, post: res.data }));
      }
      showToast("chỉnh sửa thành công!", 'success');
      return res;
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};
export const updateStatusPost = async (dispatch, postId, payload) => {
   try {
      const res = await axiosClient.put(`/api/post/${postId}/status`, payload);

      await dispatch(saveUpdateStatusPost({ postId, status: payload }));
      showToast(res.message, 'success');
      return res;
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};
export const getAllPost = async (params, dispatch) => {
   try {
      const res = await axiosClient.get('/api/post', { params });
      await dispatch(getPosts(res));
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

export const getCoursePostAPI = async (courseId, params, dispatch) => {
   try {
      const res = await axiosClient.get(`/api/post/course/${courseId}`, {
         params,
      });
      await dispatch(getCoursePosts(res));
   } catch (error) {
      // showToast(error.data.message, "error");
      console.log(error);
   }
};

export const getPostById = async (id, dispatch) => {
   try {
      // get post
      const res = await axiosClient.get(`/api/post/${id}`);
      // get comment of post
      const comments = await fetchCmtsAPI(id);

      await dispatch(getPost({ post: res.data, comments }));
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};
export const getUserPost = async (userId, dispatch) => {
   try {
      //get post of user
      const res = await axiosClient.get(`/api/post/${userId}/user`);
      // Update post in profile
      await dispatch(getPostsUser(res.data));
      return res.data;
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

export const getbookmarkPost = async (userId, dispatch) => {
   try {
      //get bookmark of user
      const res = await axiosClient.get(`/api/user/bookmarks/${userId}`);
      // Update post in profile
      await dispatch(getBookmarksUser(res.data));
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

// Post in HomePage
export const likePost = async (postId, userId, dispatch) => {
   try {
      const res = await axiosClient.post(`/api/post/${postId}/like`);

      await dispatch(addFavoriteList({ postId, userId, res }));
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

export const unLikePost = async (postId, userId, dispatch) => {
   try {
      const res = await axiosClient.post(`/api/post/${postId}/unlike`);

      await dispatch(removeFavoriteList({ postId, userId, res }));
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

// Post in ProfilePage
export const likePostInProfile = async (postId, userId, dispatch, property = 'posts') => {
   try {
      const res = await axiosClient.post(`/api/post/${postId}/like`);

      await dispatch(likePostProfile({ postId, userId, property }));
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

export const unLikePostInProfile = async (
   postId,
   userId,
   dispatch,
   property = 'posts'
) => {
   try {
      const res = await axiosClient.post(`/api/post/${postId}/unlike`);

      await dispatch(unLikePostProfile({ postId, userId, property }));
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};
