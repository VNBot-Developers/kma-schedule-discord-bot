exports.run = function (client, message, args) {
    message.reply("Pong!");
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  userOnly: false,
  aliases: ['cs'],
  permLevel: 0
};

exports.help = {
  name : "ping",
  description: "Ping đến bot",
  usage: "ping"
};