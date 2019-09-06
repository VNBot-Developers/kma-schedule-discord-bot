const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    displayName: String,
    gender: String,
    avatarUrl: String,
    setting: String,
})

const User = mongoose.model('user', UserSchema);

module.exports = User;