const User = require("../../models/user");
const { RichEmbed } = require("discord.js");
exports.run = async function(client, message, args) {
    const [studentCode] = args;
    client.events.set(message.author.id, {
        type: 'schedule:download',
        data: {
            studentCode,
            password: undefined,
        }
    });
    const { data: semesters } = await User.showSemester();
    c

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    dmOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "login",
    description: "Đăng nhập vào tài khoản sinh viên",
    usage: "login [student code]"
};