import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    numbercode: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
},{timestamps: true});

// Hash password here
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
    next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const user = mongoose.model('users', userSchema);

export default user