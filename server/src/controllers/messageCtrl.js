import MessageModel from "../models/messageModel.js"
import ChatModel from '../models/chatModel.js'

class MessageCtroller {
    
    //@description     Send message
    //@route           [POST] /message/send
    //@body            { sender, content, chatId }
    //@access          verifyToken
    async sendMessage(req, res){
        try {
            const {sender, content, chatId } = req.body
            if(!sender || !content || !chatId){
                return res.status(400).json({message: "Please fill out the fields"})
            }
            const newMessage  = await MessageModel.create({sender, content, chatId})
            return res.status(200).json({message: "successful", data: newMessage})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    //@description     Fetch all message for an chat
    //@route           [POST] /api/message/
    //@body            { chatId }
    //@access          verifyToken
    async getMessages(req, res){
        try {
            const {chatId } = req.body
            const chat = await ChatModel.findById({_id: chatId})
            if(!chat){
                return res.status(403).json({message: 'The chat does not exist'})
            }
            const messages = await MessageModel.find({chatId: chatId})
            return res.status(200).json({messages: "successful", data: messages})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export default new MessageCtroller()