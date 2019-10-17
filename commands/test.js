const Discord = require('discord.js');
const User = require("../models/user");
exports.run = async function(client, message, args) {

    const helpEmbed = new Discord.RichEmbed();
    helpEmbed
        .setColor("#993a9e")
        .setFooter("Bot by Notekunn");

    helpEmbed.addField("Chọn học kỳ:", "1 - Học kỳ 1\n2 - Học kỳ 2", true);

    message.channel.send(helpEmbed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    dmOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "test",
    description: "Test",
    usage: "test"
};