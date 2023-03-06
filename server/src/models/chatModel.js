import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatSchema = new Schema({
   name: {type: String},
   admin: {type: Schema.Types.ObjectId, ref: 'user'},
   participant: [{type: Schema.Types.ObjectId, ref: 'user'}],
   isGroupChat: {type: Boolean},
   lastestMessage: {type: Schema.Types.ObjectId, ref: 'message'}
},{timestamps: true})

const chat = mongoose.model('chat', chatSchema);

export default chat