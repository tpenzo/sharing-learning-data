import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    account: {type: Schema.Types.ObjectId, ref: 'user'},
    teacherCode: {type: String, min: 8, unique: true},
    managedCourses: [{type: Schema.Types.ObjectId, ref: 'course'}]
}, {timestamps: true})

const teacher = mongoose.model('teacher', teacherSchema);

export default teacher