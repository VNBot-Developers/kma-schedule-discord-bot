const { authorID } = require("../config/bot");
exports.run = function (client, message, args, alias, commands) {
    if (args.length == 0) return message.channel.send(`Thao tác không hợp lệ.`);
    if (message.author.id != authorID) return message.reply("Bạn không có quyền thực hiện thao tác này!.");
    const commandReload = args[0];
    if(!alias.hasOwnProperty(commandReload)) return message.reply(`Lệnh \`${commandReload}\` không tồn tại!.`);
    try {
        delete require.cache[require.resolve(alias[commandReload])];
        commands[commandReload] = require(alias[commandReload]);
        message.channel.send(`Lệnh \`${commandReload}\` reload thành công!.`);
    } catch (error) {
        message.channel.send(error.stack);
    }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  userOnly: false,
  aliases: ['cs'],
  permLevel: 0
};
exports.help = {
  name : "reload",
  description: "Tải lại lệnh",
  usage: "reload [command]"
};