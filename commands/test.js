const Discord = require('discord.js');
exports.run = function(client, message, args) {
    // console.log(message.guild.channels.size);
    const { channel } = message;
    message.channel.send('Please enter more input.').then(() => {
        const filter = m => message.author.id === m.author.id;

        message.channel.awaitMessages(filter, { time: 60000, maxMatches: 1, errors: ['time'] })
            .then(messages => {
                message.channel.send(`You've entered: ${messages.first().content}`);
            })
            .catch(() => {
                message.channel.send('You did not enter any input!');
            });
    });
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