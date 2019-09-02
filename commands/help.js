exports.run = function (client, message, args) {
    if(args.length == 0 ){
        message.channel.send("Đang cập nhật");
        return;
    }
    const command = args[0];

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  userOnly: false,
  aliases: ['cs'],
  permLevel: 0
};

exports.help = {
  name : "help",
  description: "Hiển thị bảng trợ giúp",
  usage: "help [command]"
};