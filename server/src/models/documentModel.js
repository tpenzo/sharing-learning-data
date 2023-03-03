import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const documentSchema = new Schema({
    title:{ type: String},
    type: {type: String},
    description: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    urlDoc: {type: String},
    post: {type: Schema.Types.ObjectId, ref: 'post'},
    course: {type: Schema.Types.ObjectId, ref: 'course'}
},{timestamps: true})

const document = mongoose.model('document', documentSchema);

export default document