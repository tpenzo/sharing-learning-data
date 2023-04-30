import UserModel from '../models/userModel.js';
import PostModel from '../models/postModel.js';
import bcrypt from 'bcryptjs';

class UserController {
   //@description     Get user
   //@route           [GET] /user/:userId
   //@body            No
   //@access          verifyToken
   async getUser(req, res) {
      try {
         const { userId } = req.params;
         const user = await UserModel.findById({ _id: userId });
         if (!user) {
            return res.status(400).json({ message: 'This user does not exist' });
         }
         const { password, ...others } = user._doc;
         return res.status(200).json({ message: 'successful', data: others });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     update user
   //@route           [PATCH] /user/:userId/update
   //@body            {...}
   //@access          verifyToken
   async updateUser(req, res) {
      try {
         const { userId } = req.params;
         const user = await UserModel.findByIdAndUpdate({ _id: userId }, req.body);
         if (!user) {
            return res.status(400).json({ message: 'This user does not exist' });
         }
         return res.status(200).json({ message: 'successful' });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     change password user
   //@route           [POST] /user/:userId/update/password
   //@body            {...}
   //@access          verifyToken
   async changePassword(req, res) {
      try {
         const { userId } = req.params;
         const user = await UserModel.findById({ _id: userId });
         if (user) {
            const salt = await bcrypt.genSalt(10);
            const match = await bcrypt.compare(req.body.password, user.password);
            console.log(req.body, match);
            if (match) {
               const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
               await UserModel.findByIdAndUpdate(
                  { _id: userId },
                  { password: hashedNewPassword }
               );
            } else {
               return res.status(400).json({ message: 'Wrong password' });
            }
         } else {
            return res.status(404).json({ message: 'This user does not exist' });
         }
         return res.status(200).json({ message: 'successful' });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     Search user
   //@route           [GET] /user/search?info=''
   //@body            No
   //@access          verifyToken
   async search(req, res) {
      try {
         const { info } = req.query;

         // Search user
         const userList = await UserModel.find({
            $or: [
               { email: { $regex: info } },
               { fullName: { $regex: info } },
               { teacherCode: { $regex: info } },
               { studentCode: { $regex: info } },
            ],
         }).select('fullName urlAvatar email role teacherCode studentCode');

         const postList = await PostModel.find({
            $and: [
               { $or: [{ tag: { $regex: info } }, { title: { $regex: info } }] },
               { status: 'posted' },
            ],
         })
            .select('title tag author')
            .populate('author', 'fullName urlAvatar email role teacherCode studentCode');
         return res
            .status(200)
            .json({ message: 'successful', data: { userList, postList } });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     follow user
   //@route           [POST] /user/follow
   //@body            { userId }
   //@access          verifyToken
   async followUser(req, res) {
      try {
         const { userId } = req.body;
         // Check if you have tracked or not
         const user = await UserModel.find({
            _id: userId,
            follower: req.userLogin._id,
         });
         if (user.length > 0) {
            return res.status(500).json({ message: 'You followed this user.' });
         }
         // update model
         await UserModel.findByIdAndUpdate(
            { _id: req.userLogin._id },
            { $push: { following: userId } }
         );
         await UserModel.findByIdAndUpdate(
            { _id: userId },
            { $push: { follower: req.userLogin._id } }
         );
         return res.status(200).json({ message: 'successful' });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     unfollow user
   //@route           [POST] /user/unfollow
   //@body            { userId }
   //@access          verifyToken
   async UnFollowUser(req, res) {
      try {
         const { userId } = req.body;
         // update model
         await UserModel.findByIdAndUpdate(
            { _id: req.userLogin._id },
            { $pull: { following: userId } }
         );
         await UserModel.findByIdAndUpdate(
            { _id: userId },
            { $pull: { follower: req.userLogin._id } }
         );
         return res.status(200).json({ message: 'successful' });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     get All teacher Info
   //@route           [GET] /api/teacher/all/page
   //@body            {}
   //@access          verifyToken
   async getAllTeacher(req, res) {
      try {
         const teacherListCount = await UserModel.countDocuments({ role: 'teacher' });
         let perPage = 40; //courses displayed for each time call API
         let { page } = req.params || 1;
         const teacherList = await UserModel.find({ role: 'teacher' })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
         return res
            .status(200)
            .json({ message: 'successful', data: { teacherList, teacherListCount } });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description    get All teacher Info
   //@route           [GET] /api/teacher/all
   //@body            {}
   //@access          verifyToken
   async getAllTeacherList(req, res) {
      try {
         const teacherList = await UserModel.find({ role: 'teacher' });
         return res.status(200).json({ message: 'successful', data: teacherList });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     get All student Info
   //@route           [GET] /api/student/all/page
   //@body            {}
   //@access          verifyToken
   async getAllStudent(req, res) {
      try {
         const studentListCount = await UserModel.countDocuments({ role: 'student' });
         let perPage = 40; //courses displayed for each time call API
         let { page } = req.params || 1;
         const studentList = await UserModel.find({ role: 'student' })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
         return res
            .status(200)
            .json({ message: 'successful', data: { studentList, studentListCount } });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     getAll ministry Info
   //@route           [GET] /api/ministry/all
   //@body            {}
   //@access          verifyToken
   async getAllMinistry(req, res) {
      try {
         const ministryListCount = await UserModel.countDocuments({ role: 'ministry' });
         let perPage = 40; //courses displayed for each time call API
         let { page } = req.params || 1;
         const ministryList = await UserModel.find({ role: 'ministry' })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
         return res
            .status(200)
            .json({ message: 'successful', data: { ministryList, ministryListCount } });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     Get student by studentCode
   //@route           [GET] /user/student/:userId
   //@body            No
   //@access          verifyToken
   async getStudentByCode(req, res) {
      try {
         const { studentCode } = req.params;
         console.log(studentCode);
         const student = await UserModel.findOne({ studentCode: studentCode });
         if (!student) {
            return res.status(400).json({ message: 'This student info does not exist' });
         }
         const { password, ...others } = student._doc;
         return res.status(200).json({ message: 'successful', data: others });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     bookmark post
   //@route           [POST] /user/bookmark
   //@body            { postId }
   //@access          verifyToken
   async bookmarkPost(req, res) {
      try {
         const { postId } = req.body;
         // update model
         await UserModel.findByIdAndUpdate(
            { _id: req.userLogin._id },
            { $push: { bookmarkPost: postId } }
         );
         return res.status(200).json({ message: 'successful' });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
   //@description     unbookmark post
   //@route           [POST] /user/unbookmark
   //@body            { postId }
   //@access          verifyToken
   async unBookmarkPost(req, res) {
      try {
         const { postId } = req.body;
         // update model
         await UserModel.findByIdAndUpdate(
            { _id: req.userLogin._id },
            { $pull: { bookmarkPost: postId } }
         );
         return res.status(200).json({ message: 'successful' });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   //@description     get bookmark post
   //@route           [GET] /user/bookmarks/:userId
   //@access          verifyToken
   async getBookmarkPosts(req, res) {
      try {
         const user = await UserModel.findOne({
            _id: req.params.userId,
         }).populate({
            path: 'bookmarkPost',
            populate: [
               {
                  path: 'author',
                  select: 'fullName urlAvatar teacherCode studentCode',
               },
               {
                  path: 'docs',
               },
            ],
         });
         return res.status(200).json({ data: user.bookmarkPost, message: 'successful' });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }

   async getTopAuthors(req, res) {
      try {
         const results = await PostModel.aggregate([
            {
               $match: {
                  $and: [{ status: 'posted' }, { course: null }],
               },
            },
            {
               // Group by author and count number of posts
               $group: {
                  _id: '$author',
                  numPosts: { $sum: 1 },
                  numLikes: { $sum: { $size: '$likes' } },
               },
            },
            {
               // Sort by number of posts and likes
               $sort: {
                  numPosts: -1,
                  numLikes: -1,
               },
            },
            {
               // Limit to top 5 authors
               $limit: 5,
            },
         ]).exec();

         // Extract the author IDs from the results
         const authorIds = results.map((result) => result._id);

         // Populate the author fields from the user collection
         const authors = await UserModel.find({ _id: { $in: authorIds } })
            .select('fullName urlAvatar email role teacherCode studentCode')
            .exec();

         // Map the results to include the author details
         const topAuthors = results.map((result) => {
            const author = authors.find((author) => author.id === result._id.toString());
            return { author, numPosts: result.numPosts, numLikes: result.numLikes };
         });
         return res.status(200).json({ data: topAuthors, message: 'successful' });
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
}

export default new UserController();
