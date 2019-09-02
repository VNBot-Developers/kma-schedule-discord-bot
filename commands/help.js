const { RichEmbed } = require("discord.js")
exports.run = function(client, message, args, commands, prefix) {
    if (args.length == 0) {
        const helpEmbed = new RichEmbed();
        helpEmbed
            .setColor("#993a9e")
            .setThumbnail(client.user.avatarURL);
        helpEmbed.addField("Help Command <:help:617956560613670922>",
            `Hey, I'm ${client.user.username}, a vietnamese bot for utility, fun, gaming, images and music.\n My prefix is ${prefix} and here's my commands list.\nYou can do ${prefix}help <command name> to have informations about the command.\nYou can do ${prefix}help to receive the help command in the server.`)
            .addField('Available commands', '\u200B')
            .setFooter("Bot by Notekunn");
        helpEmbed.addField("Help", "`help`", true);
        helpEmbed.addField("Normal", "`ping`", true);
        helpEmbed.addField("Administrator", "`reload`", true);
        helpEmbed.addField("Student", "`login`", true);
        helpEmbed.addField("Music", "`play`", true);
        message.channel.send(helpEmbed)
        return;
    }
    const cmd = args[0];
    if (!commands.hasOwnProperty(cmd)) message.channel.send("Comment is not available");
    const command = commands[cmd];
    const helpEmbed = new RichEmbed();
    helpEmbed
        .setColor("#993a9e")
        .setFooter("Bot by Notekunn")
        .setThumbnail(client.user.avatarURL)
        .addField(command.help.name, `${command.help.description}`)
        .addField("Usage", `${prefix}${command.help.usage}`)
    message.channel.send(helpEmbed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    userOnly: false,
    aliases: ['cs'],
    permLevel: 0
};

exports.help = {
    name: "help",
    description: "Hiển thị bảng trợ giúp",
    usage: "help [command]"
};