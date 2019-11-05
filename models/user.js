const mongoose = require("mongoose");
const UserApi = require("../services/api/user");
const { Schema } = mongoose;

const UserSchema = new Schema({
    displayName: String,
    gender: String,
    avatarUrl: String,
    setting: String,
    discordId: {
        type: String,
        unique: true,
        required: true,
    },
    token: String,
    information: {
        studentCode: String,
        name: String,
        className: String,
        gender: String
    },
})
UserSchema.pre('save', function (next) {
    if (!this.avatarUrl) this.avatarUrl = "https://cdn.discordapp.com/embed/avatars/0.png";
    if (!this.setting) this.setting = JSON.stringify({});
    if (!this.information) this.information = {};
    next();
})
UserSchema.methods.login = async function (studentCode, password) {
    const { user: { name, className, studentCode: _studentCode }, token } = await UserApi.register(studentCode, password)
        .catch(error => {
            if (error.statusCode === 409) return UserApi.login(studentCode, password);
            return Promise.reject(error);
        });
    const self = this;
    self.information = { name, className, studentCode: _studentCode };
    self.token = token;
    return await self.save();
}
UserSchema.methods.checkToken = async function () {
    const { token } = this;
    if (!token) return;
    try {
        await UserApi.checkToken(token);
        return true;
    } catch (error) {
        this.token = null;
        await this.save();
        return false;
    }
}
UserSchema.methods.showSemester = function () {
    const { token } = this;
    if (!token) return Promise.reject("Bạn chưa đăng nhập!");
    return UserApi.showSemester(token)
}
UserSchema.methods.download = function (drpSemester) {
    const { token } = this;
    return UserApi.download(token, drpSemester);
}
UserSchema.methods.search = function (days) {
    const { token } = this;
    return UserApi.search(token, days);
}
UserSchema.statics.findOneOrCreate = async function (where, data) {
    const user = await User.findOne(where);
    if (!user) return await User.create({ ...where, ...data });
    return await User.findOneAndUpdate(where, data);

}
const User = mongoose.model('user', UserSchema);

module.exports = User;