const User = require("../models/user");
exports.run = async function(client, message, _event) {
    const user = await User.findOneOrCreate({ discordId: message.author.id }, { displayName: message.author.tag });
    const semesters = _event.data.semesters;
    const select = parseInt(message.content, 10);
    if (select < 1 || select > semesters.length)  message.channel.send(`Vui lòng chọn lại(1-${semesters.length}):`);
    const semseter = semesters[select];
    message.channel.send(`Tải về thời khóa biểu!`);
    await user.download();
    console.log(semseter);

}