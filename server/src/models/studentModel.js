import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    account: {type: Schema.Types.ObjectId, ref: 'user'},
    studentCode: {type: String, min: 8, unique: true},
    class: {type: String},
    major: {type: String},
    bookmarkPost: [{type: Schema.Types.ObjectId, ref: 'post'}]
},{timestamps: true})

const student = mongoose.model('student', studentSchema);

export default student