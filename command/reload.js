const { authorID } = require("../config/bot");
exports.run = function (client, message, args, commandFile, commands) {
    if (args.length == 0) return;
    if (message.author.id != authorID) return message.reply("Bạn không có quyền thực hiện thao tác này!.");    
    const commandReload = args[0];
    if(!commandFile.hasOwnProperty(commandReload)) return message.reply(`Lệnh \`${commandReload}\` không tồn tại!.`);
    try {
        delete require.cache[require.resolve(`./${commandReload}.js`)];
        commands[commandReload] = require(`./${commandFile[commandReload]}.js`);
        message.channel.send(`Lệnh \`${commandReload}\` reload thành công!.`);
    } catch (error) {
        message.channel.send(error.stack);
    }
}