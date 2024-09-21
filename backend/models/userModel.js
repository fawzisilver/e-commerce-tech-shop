import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, {
    timestamps: true,
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password) //this.password is the current password stored in user database
}

//this happens before its saved to add salt to password
userSchema.pre('save', async function (next) {
    // if (this) current password is not modified then proceed with next()
    if(!this.isModified('password')) {
        next();
    }

    //if password is modified
    const salt = await bcrypt.genSalt(10);
    // replacing plain text password with hashed password
    this.password = await bcrypt.hash(this.password, salt)

})

const User = mongoose.model('User', userSchema);

export default User;



