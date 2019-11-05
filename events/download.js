const User = require("../models/user");
const getProp = require("lodash/get");
exports.run = async function (client, message, _event) {
    const user = await User.findOneOrCreate({ discordId: message.author.id }, { displayName: message.author.tag, avatarUrl: message.author.avatarURL });
    const semesters = _event.data.semesters;
    const select = parseInt(message.content, 10);
    if (select < 1 || select > semesters.length) message.channel.send(`Vui lòng chọn lại(1-${semesters.length}):`);
    const semseter = semesters[select];
    message.channel.send(`Tải về thời khóa biểu!`);
    try {
        await user.download();
    } catch (error) {

        return Promise.reject(Error(getProp(error, 'error.error.message') || getProp(error, 'error.message') || 'Tải thời khóa biểu thất bại'))
    }
    console.log(semseter);

}