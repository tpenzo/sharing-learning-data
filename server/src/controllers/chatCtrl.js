import UserModel from '../models/userModel.js'
import ChatModel from '../models/chatModel.js'


class ChatController {
    
    //@description     Find the chat, if it's not complete, create a new one
    //@route           [POST] /api/chat/access
    //@body            {userId}
    //@access          verifyToken
    async accessChat(req, res){
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ message: 'userId param not sent with request' });
            }
            // Find chat
            let isChat = await ChatModel.find({
                isGroupChat: false, 
                $and: [
                    { participant: { $elemMatch: { $eq: req.userLogin._id } } },
                    { participant: { $elemMatch: { $eq: userId } } }
                ]
            }).populate('participant', '-password').populate("lastestMessage")
            if (isChat.length > 0) {
                return res.status(200).json({message: 'successful', data: isChat[0]});
            }
            // If it's not find, create a new one
            let chatData = {
                // name: 'sender',
                isGroupChat: false,
                participant: [req.userLogin._id, userId],
            };
            const newChat = await ChatModel.create(chatData)
            const fullChat = await ChatModel
                .findOne({ _id: newChat._id })
                .populate('participant', '-password');
            return res.status(200).json({message: 'successful', data: fullChat});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    //@description     Fetch all chats for a user
    //@route           [GET] /api/chat/
    //@body            No
    //@access          verifyToken
    async fetchChats(req, res){
        try {
            const chats = await ChatModel.find({participant: { $elemMatch: { $eq:req.userLogin._id } }})
                .populate('participant', '-password')
                .populate("admin", "-password")
                .populate({path: 'lastestMessage', populate: {
                    path: "sender",
                    select: "email fullName urlAvatar",
                }})
                .sort({ updatedAt: -1 })
            return res.status(200).json({message: 'successful', data: chats})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    //@description     Create group chat with creator as admin 
    //@route           [POST] /api/chat/creategroup
    //@body            {participants, name}
    //@access          verifyToken
    async createGroupChat(req, res){
		try {
			if (!req.body.participants || !req.body.name) {
				return res.status(400).send({ message: "Please Fill all the feilds" });
            }
			let participants = JSON.parse(req.body.participants);
			if(participants.length < 2){
				return res.status(400).send({ message: "More than 2 users are required to form a group chat" });
			}
			participants.push(req.userLogin._id)
			console.log(req.userLogin._id)
			const groupChat = await ChatModel.create({
				name: req.body.name,
				participant: participants, // Teacher, student
				isGroupChat: true,
				admin: req.userLogin._id, // Teacher
			});
			const newGroupChat = await ChatModel.create(groupChat)
			const fullGroupChat = await ChatModel.findOne({ _id: newGroupChat._id })
      			.populate("participant", "-password")
      			.populate('admin')
			return res.status(200).json({message: 'successful', data: fullGroupChat})
       } catch (error) {
        
       }
    }
}

export default new ChatController()