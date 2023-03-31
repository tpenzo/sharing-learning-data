import postModel from "../models/postModel.js";
import documentModel from "../models/documentModel.js";
class postController {
  //@description     create post Info
  //@route           [POST] /api/post/newpost
  //@body            {title,content,course}
  //@access          verifyToken
  // files {type ,name , title, desc, url}
  async createPost(req, res) {
    const { title, content, description, courseId, docs } = req.body;
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
          });

          await newDocument.save();
          refDocs.push(newDocument);
        }
      }

      const newPost = new postModel({
        author: _id,
        title,
        content,
        course: courseId || null,
        status: courseId ? "deny" : "posted",
        docs: refDocs,
      });
      await newPost.save();
      // get post
      const post = await postModel
        .findOne({ _id: newPost._id })
        .populate("author", "fullName urlAvatar teacherCode studentCode")
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
      limit: +req.query.limit || 8,
    };
    try {
      const postList = await postModel
        .find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .populate("author", "fullName urlAvatar teacherCode studentCode")
        .sort({ createdAt: -1 })
        .populate("docs");

      res.status(200).json({ message: "successful!", data: postList });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  //@description     get post for course
  //@route           [GET] /api/post/course/:courseId
  //@query           {page,limit}
  //@access          verifyToken
  async getCoursePost(req, res) {
    const pageOptions = {
      page: +req.query.page || 0,
      limit: +req.query.limit || 8,
    };
    const { courseId } = req.params;
    const _id = req.body.courseId
    console.log(courseId, _id);
    try {
      const postList = await postModel.find({ course: courseId }).skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .populate("author", "fullName urlAvatar teacherCode studentCode")
      .sort({ createdAt: -1 })
      .populate("docs");
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
  //@route           [GET] /api/post/me
  //@access          verifyToken
  async getUserPost(req, res) {
    const author = req.params.userId;
    try {
      const postList = await postModel
        .find({ author })
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
}

export default new postController();
