const { RichEmbed } = require("discord.js");
exports.run = async function (client, message, args) {
  const embed = new RichEmbed();
  embed
    .setColor("#993a9e")
    .setFooter("Bot by Notekunn")
    .setThumbnail(client.user.avatarURL);

  embed.addField(`Chọn kiểu thông báo thời khóa biểu`, `1. Theo giờ hàng ngày (nhũng hôm có).\n2. Theo thứ hàng tuần.\n3. Theo ngày hàng tháng.`, false);


  await message.channel.send(embed).then(() => {
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
  name: "notify",
  description: "Đăng ký nhận thông báo thời khóa biểu",
  usage: "notify"
};