const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    displayName: String,
    gender: String,
    avatarUrl: String,
    setting: String,
    discordId: {
        type: String,
        unique: true
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;