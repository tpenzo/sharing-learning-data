import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    content: {type: String},
    likes: [{type: Schema.Types.ObjectId, ref: 'user'}],
    post: {type: Schema.Types.ObjectId, ref: 'post'},
    reply: [{type: Schema.Types.ObjectId, ref: 'comment'}],
},{timestamps: true})

const comment = mongoose.model('comment', commentSchema);

export default comment