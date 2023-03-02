import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseID: {type: String},
    name: {type: String},
    description: {type: String},
    teacher: {type: Schema.Types.ObjectId, ref: 'teacher'},
    studentList: [{type: Schema.Types.ObjectId, ref: 'student'}],
    chatGroup: {type: Schema.Types.ObjectId, ref: 'chat'},
    semester: {type: Number},
    schoolyear: {type: String}
},{timestamps: true})

const course = mongoose.model('course', courseSchema);

export default course