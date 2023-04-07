import documentModel from "../models/documentModel.js";
class documentController {
  //@description     get docs
  //@route           [GET] /api/doc
  //@query           {courseId,postId}
  //@access          verifyToken
  async getAllDocument(req, res) {
    const conditions = {};
    req.query.courseId && (conditions.course = req.query.courseId);
    req.query.postId && (conditions.post = req.query.postId);
    try {
      const docList = await documentModel
        .find(conditions)
        .populate("user", "-password")
        .populate(["post", "course"]);

      res.status(200).json({ message: "successful!", data: docList });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //@description     get doc by user Info
  //@route           [GET] /api/document/me
  //@access          verifyToken
  async getUserDoc(req, res) {
    const { user } = req.params.userId;
    try {
      const postList = await documentModel.find({ user });
      res.status(200).json({ message: "successful!", data: postList });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //@description     delete doc
  //@route           [DELETE] /api/document/:docId
  //@access          verifyToken
  async deleteDoc(req, res) {
    const docId = req.params.docId;

    try {
      await documentModel.deleteOne({ _id: docId });
      res.status(200).json({ message: "successful!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new documentController();
