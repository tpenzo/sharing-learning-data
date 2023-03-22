import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true,  min: 8 },
    fullName: {type: String, require: true},
    urlAvatar: { type: String, default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',},
    phoneNumber: { type: String, default: null},
    gender: { type: String, enum: ['male', 'female','other'], default: 'male' },
    follower: [{type: Schema.Types.ObjectId, ref: 'user'}],
    following:[{type: Schema.Types.ObjectId, ref: 'user'}],
    role:{
        type: String,
        enum: ['student', 'teacher', 'ministry', 'admin'],
        default: 'student'
    },
    // Teacher
    teacherCode: {type: String, min: 8},
    managedCourses: [{type: Schema.Types.ObjectId, ref: 'course'}],
    // Student
    studentCode: {type: String, min: 8},
    class: {type: String},
    major: {type: String},
    followingCourses: [{type: Schema.Types.ObjectId, ref: 'course'}],
    bookmarkPost: [{type: Schema.Types.ObjectId, ref: 'post'}]
    
},{timestamps: true});

// Hash password here
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
    next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const user = mongoose.model('user', userSchema);

export default user