import PostModel from '../models/postModel.js'
import CommentModel from '../models/commentModel.js'

class CommentController {
    
    async getComments(req, res){
        try {
            const { postId } = req.params
            const post = await PostModel.findById({_id: postId})
            if(!post) 
                return res.status(400).json({message: "This post does not exist."})
            // get cmt
            const cmts = await CommentModel.find({ postId })
                .populate('user', 'fullName urlAvatar teacherCode studentCode')
                .populate({
                    path: 'reply', 
                    populate: {
                        path: 'user', 
                        select: 'fullName urlAvatar teacherCode studentCode'
                    }
                })
            return res.status(200).json({message: 'successful', data: cmts})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    
    async createComment(req, res){
        try {
            const { postId, content } = req.body
            const post = await PostModel.findById({_id: postId})
            if(!post) 
                return res.status(400).json({message: "This post does not exist."})
            // create comment
            const newComment = new CommentModel({
                user: req.userLogin._id, postId, content
            })
            await newComment.save();
            // get new comment
            const comment = await CommentModel.findById(newComment._id)
                .populate('user', 'fullName urlAvatar teacherCode studentCode');
            return res.status(200).json({message: 'successful', data: comment})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    async replyComment(req, res){
        try {
            const { content, idCmtReply } = req.body
            console.log(idCmtReply)
            // create comment
            const newComment = new CommentModel({
                user: req.userLogin._id, content
            })
            await newComment.save();
            // update reply
            await CommentModel.findByIdAndUpdate(
                {_id: idCmtReply},
                { $push: {reply : newComment._id }
            })
            // get new reply comment
            const comment = await CommentModel.findById(newComment._id)
                .populate('user', 'fullName urlAvatar teacherCode studentCode');

            return res.status(200).json({message: 'successful', data: comment})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    async updateComment(req, res){
        try {
            const { content } = req.body
            
            await CommentModel.findOneAndUpdate({
                _id: req.params.id, user: req.userLogin._id
            }, {content})

            return res.status(200).json({message: 'successful'})

        } catch (error) {
           return res.status(500).json({message: error.message})
        }
    }

    async likeComment(req, res){
        try {
            const comment = await CommentModel.find({_id: req.params.id, likes: req.userLogin._id})
            if(comment.length > 0) 
                return res.status(400).json({message: "You liked this post."})

            await CommentModel.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.userLogin._id}
            }, {new: true})

            return res.status(200).json({message: 'successful'})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    async unLikeComment(req, res){
        try {

            await CommentModel.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.userLogin._id }
            }, {new: true})

            return res.status(200).json({message: 'successful'})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    async deleteComment(req, res){
        try {
            await CommentModel.findByIdAndDelete({_id: req.params.id})
            return res.status(200).json({message: 'successful'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default new CommentController()