import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {type: Schema.Types.ObjectId, ref: 'user'},
  content: {type: String},
  chat: {type: Schema.Types.ObjectId, ref: 'chat'}
},{timestamps: true})

const message = mongoose.model('message', messageSchema);

export default message