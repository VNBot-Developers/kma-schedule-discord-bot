const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccountSchema = new Schema({
    studentCode: String,
    password: String,
    name: String,
    className: String,
    userId: Schema.Types.ObjectId,
})

const Account = mongoose.model('user', AccountSchema);

module.exports = Account;