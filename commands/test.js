const Discord = require('discord.js');
const User = require("../models/user");
exports.run = async function(client, message, args) {
    message.channel.send(">test :radio_button:")
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