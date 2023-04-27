import {
   followUser,
   unfollowUser,
   updateUser,
   addBookmarkUser,
   unBookmarkUser,
} from '../redux/AuthSlice.js';
import {
   addBookmarkProfile,
   profileGetUser,
   profileUpdateFollower,
   profileUpdateUnFollower,
   removeBookmarkProfile,
} from '../redux/ProfileSlice.js';
import axiosClient from './axiosClient.js';
import showToast from './showToast.js';

export const profileGetUserAPI = async (userId, dispatch) => {
   try {
      // Call API
      const res = await axiosClient.get(`/api/user/${userId}`);
      await dispatch(profileGetUser(res.data));
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

export const followUserAPI = async (userId, dispatch, socket) => {
   try {
      // Call API
      const res = await axiosClient.post('/api/user/follow', { userId });
      // Update following of user
      await dispatch(followUser(userId));
      // Update follower of user profile
      await dispatch(profileUpdateFollower(userId));
      // socket [follow]
      socket.emit('follow', userId);
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

export const unFollowUserAPI = async (userId, dispatch, socket) => {
   try {
      // Call API
      const res = await axiosClient.post('/api/user/unfollow', { userId });
      // Update following of user
      await dispatch(unfollowUser(userId));
      // Update follower of user profile
      await dispatch(profileUpdateUnFollower(userId));
      // socket [unfollow]
      socket.emit('unFollow', userId);
   } catch (error) {
      showToast(error.data.message, 'error');
   }
};

export const addBookmarkAPI = async (post, dispatch) => {
   try {
      // Call API
      const res = await axiosClient.post('/api/user/bookmark', { postId: post._id });
      
      await dispatch(addBookmarkUser(post._id));

      await dispatch(addBookmarkProfile({ post }));

      showToast('Đã lưu bài viết', 'success');
   } catch (error) {
      showToast(error.message, 'error');
   }
};

export const unBookmarkAPI = async (post, dispatch) => {
   try {
      // Call API
      const res = await axiosClient.post('/api/user/unbookmark', { postId: post._id });

      await dispatch(unBookmarkUser(post._id));

      await dispatch(removeBookmarkProfile({ potstId: post._id }));

      showToast('Bỏ lưu bài viết', 'success');
   } catch (error) {
      showToast(error.message, 'error');
   }
};

export const searchAPI = async (value) => {
   try {
      const res = await axiosClient.get(`/api/user/search?info=${value}`);
      return res.data;
   } catch (error) {
      return [];
   }
};

export const updateUserAPI = async (userId, data, dispatch) => {
   try {
      const res = await axiosClient.post(`/api/user/${userId}/update`, data);
      // update
      await dispatch(updateUser(data));

      showToast('Chỉnh sửa thành công', 'success');
   } catch (error) {
      console.log(error);
      // showToast(error, "error");
   }
};

export const changePasswordAPI = async (userId, data) => {
   try {
      console.log(data);
      const response = await axiosClient.post(
         `/api/user/${userId}/update/password`,
         data
      );
      showToast('Thay đổi mật khẩu thành công', 'success');
      return response;
   } catch (error) {
      if (error.status === 400) {
         showToast('Mật khẩu hiện tại không đúng!Vui lòng thử lại', 'error');
      } else if (error.status === 404) {
         showToast('Không tìm thấy người dùng!', 'error');
      }
   }
};
