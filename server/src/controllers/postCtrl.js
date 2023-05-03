import postModel from "../models/postModel.js";
import documentModel from "../models/documentModel.js";
class postController {
  //@description     create post Info
  //@route           [POST] /api/post/newpost
  //@body            {title,content,course}
  //@access          verifyToken
  // files {type ,name , title, desc, url}
  async createPost(req, res) {
    const { title, content, description, courseId, docs, tag } = req.body;
    const { _id, role } = req.userLogin;
    try {
      const refDocs = [];
      if (docs.length > 0) {
        for (let file of [...docs]) {
          const newDocument = new documentModel({
            title,
            course: courseId || null,
            description,
            name: file.name,
            urlDoc: file?.url,
            type: file?.type || null,
            user: _id,
            tag: tag || null,
          });

          await newDocument.save();
          refDocs.push(newDocument);
        }
      }
      let status = role === "student" ? "pending" : "posted";
      const newPost = new postModel({
        author: _id,
        title,
        content,
        course: courseId || null,
        status,
        docs: refDocs,
        tag: tag || null,
      });
      await newPost.save();
      // get post
      const post = await postModel
        .findOne({ _id: newPost._id })
        .populate("author", "fullName urlAvatar teacherCode studentCode")
        .populate("course")
        .populate("docs");
      res.status(200).json({ message: "successful!", data: post });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //@description     get Info
  //@route           [GET] /api/post
  //@query           {page,limit}
  //@access          verifyToken
  async getAllPost(req, res) {
    const pageOptions = {
      page: +req.query.page || 0,
      limit: +req.query.limit || 6,
    };
    const status = req.query.status;
    const showMore = (pageOptions.page + 1) * pageOptions.limit;
    try {
      const countPost = await postModel.countDocuments({ course: null, status });
      const postList = await postModel
        .find({ course: null, status })
        .skip(0)
        .limit(showMore)
        .populate("author", "fullName urlAvatar teacherCode studentCode")
        .sort({ createdAt: -1 })
        .populate("docs");
      res.status(200).json({ message: "successful!", data: { postList, countPost } });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     get post for course
  //@route           [GET] /api/post/course/:courseId
  //@query           {page,limit}
  //@access          verifyToken
  async getCoursePost(req, res) {
    const status = req.query.status;
    const pageOptions = {
      page: +req.query.page || 0,
      limit: +req.query.limit || 8,
    };
    const { courseId } = req.params;
    const _id = req.body.courseId;
    console.log(courseId, _id);
    try {
      const postList = await postModel
        .find({ course: courseId, status })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .populate("author", "fullName urlAvatar teacherCode studentCode")
        .sort({ createdAt: -1 })
        .populate("docs")
        .populate("course");
      console.log(postList);
      res.status(200).json({ message: "successful!", data: postList });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //@description     get post by id Info
  //@route           [GET] /api/post/:id
  //@params          id
  //@access          verifyToken
  async getPost(req, res) {
    const id = req.params.id;
    try {
      const post = await postModel
        .findOne({ _id: id })
        .populate("author", "fullName urlAvatar teacherCode studentCode")
        .populate("docs");
      res.status(200).json({ message: "successful!", data: post });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //@description     get post by author Info
  //@route           [GET] /api/post/:userId/user
  //@access          verifyToken
  async getUserPost(req, res) {
    const author = req.params.userId;
    try {
      const postList = await postModel
        .find({ author, course: null })
        .populate("author", "fullName urlAvatar teacherCode studentCode")
        .populate("docs")
        .sort({ createdAt: -1 });
      res.status(200).json({ message: "successful!", data: postList });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //@description     like post Info
  //@route           [post] /api/post/:postId/like
  //@params          postId
  //@access          verifyToken
  async likePost(req, res) {
    const postId = req.params.postId;
    const { _id } = req.userLogin;

    try {
      const post = await postModel.findOneAndUpdate(
        { _id: postId },
        {
          $push: { likes: _id },
        },
        { new: true }
      );

      return res.status(200).json({ message: "successful", data: post });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //@description     unlike post Info
  //@route           [post] /api/post/:postId/unlike
  //@params          postId
  //@access          verifyToken
  async unLikePost(req, res) {
    const postId = req.params.postId;
    const { _id } = req.userLogin;

    try {
      const post = await postModel.findOneAndUpdate(
        { _id: postId },
        {
          $pull: { likes: _id },
        },
        { new: true }
      );
      return res.status(200).json({ message: "successful", data: post });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //@description     delete post
  //@route           [DELETE] /api/post:postId
  //@params           {postId}
  //@access          verifyToken
  async deletePost(req, res) {
    const postId = req.params.postId;
    const user = req.userLogin;

    try {
      if (!postId) return res.status(404).json({ message: "post not found" });

      const post = await postModel.findOne({ _id: postId, author: user._id }).populate("author").populate("docs");

      // xóa docs
      if (post.docs && post.docs.length > 0) {
        for (const doc of post.docs) {
          await documentModel.deleteOne({ _id: doc._id, user: user._id });
        }
      }
      // xóa post
      await postModel.deleteOne({
        _id: postId,
        author: user._id,
      });
      res.status(200).json({ message: "Đã xóa bài viết" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async editPost(req, res) {
    const postId = req.params.postId;
    const { title, content, description, courseId, docs, tag } = req.body;
    const { _id, role } = req.userLogin;
    try {
      const refDocs = [];
      if (docs.length > 0) {
        for (let file of [...docs]) {
          const newDocument = new documentModel({
            title,
            course: courseId || null,
            description,
            name: file.name,
            urlDoc: file?.url,
            type: file?.type || null,
            user: _id,
            tag: tag || null,
          });

          await newDocument.save();
          refDocs.push(newDocument);
        }
      }
      let status = role === "student" ? "pending" : "posted";
      const updatedPost = {
        author: _id,
        title,
        content,
        course: courseId || null,
        status,
        docs: refDocs,
        tag: tag || null,
      };
      await postModel.findOneAndUpdate({ _id: postId }, updatedPost, {
        new: true,
      });
      // get post
      const post = await postModel
        .findOne({ _id: postId })
        .populate("author", "fullName urlAvatar teacherCode studentCode")
        .populate("docs");
      res.status(200).json({ message: "successful!", data: post });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async updateStatusPost(req, res) {
    const postId = req.params.postId;
    const { status } = req.body;
    try {
      const updatedPost = await postModel.findByIdAndUpdate({ _id: postId }, { status }, { new: true });
      const message = status === "deny" ? "Đã từ chối" : "Đã duyệt";
      res.status(200).json({ message, data: updatedPost });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new postController();
