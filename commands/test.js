const Discord = require('discord.js');
exports.run = function(client, message, args) {
    console.log(message.guild.channels.size);
    const {channel} = message;
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    userOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "test",
    description: "Test",
    usage: "test"
};