exports.run = function(client, message, args) {
    require("../config/cmd")(client);
    message.channel.send(`Reload thành công!.`);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    userOnly: false,
    aliases: ['cs'],
    permLevel: 0
};
exports.help = {
    name: "reload",
    description: "Tải lại các lệnh",
    usage: "reload"
};