exports.run = function (client, message, args) {
    message.reply("Pong!");
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  dmOnly: false,
  aliases: ['p'],
  permLevel: 0
};

exports.help = {
  name : "ping",
  description: "Ping đến bot",
  usage: "ping"
};