const Discord = require('discord.js');
const User = require("../models/user");
exports.run = async function(client, message, args) {
    message.channel.send(message.author.avatarURL);
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