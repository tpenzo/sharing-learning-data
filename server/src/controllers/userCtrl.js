import UserModel from "../models/userModel.js"


class UserController {
    async getUser(req, res){
        try {
            const { userId } = req.params
            const user = await UserModel.findById({_id: userId})
            if(!user){
                return res.status(400).json({message: "This user does not exist"}) 
            }
            const { password, ...others } = user._doc;
            return res.status(200).json({ message: 'successful', data: others });
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    async followUser(req, res){
        try {
            const { userId } = req.body
            // Check if you have tracked or not
            const user = await UserModel.find({
                _id: userId,
                follower: req.userLogin._id,
            });
            if(user.length > 0){
                return res.status(500).json({ message: 'You followed this user.' });
            }
            // update model
            await UserModel.findByIdAndUpdate(
                {_id: req.userLogin._id},
                { $push: {following : userId }}
            )
             await UserModel.findByIdAndUpdate(
                {_id: userId},
                { $push: {follower : req.userLogin._id }}
            )
            return res.status(200).json({message: "successful"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    async UnFollowUser(req, res){
        try {
            const { userId } = req.body
            // update model
            await UserModel.findByIdAndUpdate(
                {_id: req.userLogin._id},
                { $pull: {following : userId }}
            )
             await UserModel.findByIdAndUpdate(
                {_id: userId},
                { $pull: {follower : req.userLogin._id }}
            )
            return res.status(200).json({message: "successful"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}


export default new UserController()