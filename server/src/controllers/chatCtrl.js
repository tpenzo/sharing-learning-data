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
    //@body            {participants, name, adminId}
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
			const groupChat = await ChatModel.create({
				name: req.body.name,
				participant: participants, 
				isGroupChat: true,
				admin: req.body.adminId,
			});
			const newGroupChat = await ChatModel.create(groupChat)
			const fullGroupChat = await ChatModel.findOne({ _id: newGroupChat._id })
      			.populate("participant", "-password")
      			.populate('admin', "-password")
			return res.status(200).json({message: 'successful', data: fullGroupChat})
       } catch (error) {
            return res.status(500).json({message: error.message})
       }
    }

    //@description     Add user to Group
    //@route           [POST] /api/chat/add
    //@body            {chatId, userId}
    //@access          verifyToken
    async addToGroup(req, res){
        try {
            if (!req.body.chatId || !req.body.userId) {
				return res.status(400).send({ message: "Please Fill all the feilds" });
            }
            // find user in chat
            const chat = await ChatModel.find({
                $and:[
                    {_id: req.body.chatId}, 
                    { participant: { $elemMatch: { $eq: req.body.userId } } }
                ]
            })
            if(chat){
                return res.status(404).json({message: "This user ID has joined the chat group"})
            }
            const added = await ChatModel.findByIdAndUpdate(
                req.body.chatId,
                { $push: { participant: req.body.userId }}, { new: true}
            )
                .populate("participant", "-password")
                .populate("admin", "-password");
            if (!added) {
                res.status(404).json({message:  "Chat Not Found"})
            } else {
                res.status(200).json({message: 'successful', data: added});
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    //@description     remove user to Group
    //@route           [POST] /api/chat/remove
    //@body            {chatId, userId}
    //@access          verifyToken
    async removeFromGroup(req, res){
        try {
            if (!req.body.chatId || !req.body.userId) {
				return res.status(400).send({ message: "Please Fill all the feilds" });
            }
            // find user in chat
            const chat = await ChatModel.find({
                $and:[
                    {_id: req.body.chatId}, 
                    { participant: { $elemMatch: { $eq: req.body.userId } } }
                ]
            })
            if(chat.length === 0){
                return res.status(404).json({message: "This user ID has been removed or is not in the group chat"})
            }
            const added = await ChatModel.findByIdAndUpdate(
                req.body.chatId,
                { $pull: { participant: req.body.userId }}, { new: true}
            )
                .populate("participant", "-password")
                .populate("admin", "-password");
            if (!added) {
                res.status(404).json({message:  "Chat Not Found"})
            } else {
                res.status(200).json({message: 'successful', data: added});
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export default new ChatController()