const YTDL = require("ytdl-core");

exports.run = async function(client, message, args) {

    if (!message.member.voiceChannel) return message.channel.send("Vui lòng kết nối với một kênh âm thanh.");

    if (message.guild.me.voiceChannel) return message.channel.send("Xin lỗi, bot đã kết nối với một kênh âm thanh khác.");

    if (!args[0]) return message.channel.send("Xin lỗi, vui lòng nhập một url.");

    const validate = await YTDL.validateURL(args[0]);

    if (!validate) return message.channel.send("Xin lỗi, vui lòng nhập một url **hợp lệ**.");

    const info = await YTDL.getInfo(args[0]);

    const connection = await message.member.voiceChannel.join();

    const dispatcher = connection.playStream(YTDL(args[0], { filter: "audioonly" }))
    dispatcher.on('end', () => {
        // The song has finished
      
        console.log("123");
    });

    dispatcher.on('error', e => {
        // Catch any errors that may arise
        console.log(e);
    });
    message.channel.send(`🎵 Đang phát: ${info.title}`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  dmOnly: false,
  aliases: ['pl'],
  permLevel: 0
};

exports.help = {
  name : "play",
  description: "Chơi nhạc",
  usage: "play [link ytb]"
};