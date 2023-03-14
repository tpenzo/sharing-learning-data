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

    //@description     get All teacher Info
    //@route           [GET] /api/teacher/all
    //@body            {}
    //@access          verifyToken
    async getAllTeacher(req, res) {
        try {

            const teacherList = await UserModel.find({role: "teacher"})
            return res.status(200).json({ message: "successful", data: teacherList });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    //@description     get All student Info
    //@route           [GET] /api/student/all
    //@body            {}
    //@access          verifyToken
    async getAllStudent(req, res) {
        try {
            const studentList = await UserModel.find({role: "student"})
            return res.status(200).json({ message: "successful", data: studentList });
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

            const ministryList = await UserModel.find({role: "ministry"})
            return res.status(200).json({ message: "successful", data: ministryList });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}


export default new UserController()