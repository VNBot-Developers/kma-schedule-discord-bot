const YTDL = require("ytdl-core");

exports.run = async function (client, message, args) {

    if (!message.member.voiceChannel) return message.channel.send("Vui lòng kết nối với một kênh âm thanh.");

    if (client.user.voiceChannel) return message.channel.send("Xin lỗi, bot đã kết nối với một kênh âm thanh khác.");

    if (!args[0]) return message.channel.send("Xin lỗi, vui lòng nhập một url.");

    const validate = await YTDL.validateURL(args[0]);

    if (!validate) return message.channel.send("Xin lỗi, vui lòng nhập một url **hợp lệ**.");

    const info = await YTDL.getInfo(args[0]);

    const connection = await message.member.voiceChannel.join();
    
    const dispatcher = await connection.playStream(YTDL(args[0], { filter: "audioonly" }))

    message.channel.send(`:music: Đang phát: ${info.title}`);
}
