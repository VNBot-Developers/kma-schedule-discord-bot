const Discord = require('discord.js');
const User = require("../models/user");
exports.run = async function(client, message, args) {
    // console.log(message.guild.channels.size);
    try {
        const user = await User.findOneOrCreate({ discordId: message.author.id }, { displayName: message.author.tag });
        console.log(user)
    } catch (error) {

        message.channel.send(`Có lỗi xảy ra: ${error}`);
    }
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