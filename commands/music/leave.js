exports.run = async function (client, message, args)
{
	if (!message.member.voiceChannel) return message.channel.send("Bạn chưa kết nối vào kênh thoại nào!");
	if (!message.guild.me.voiceChannel) return message.channel.send("Bot đã rời kênh thoại!");
	if (message.guild.me.voiceChannel !== message.member.voiceChannel) return message.channel.send("Bạn và bot không cùng kênh thoại!");

	message.channel.send("Leaving....");
	await message.guild.me.voiceChannel.leave();
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	dmOnly: false,
	aliases: [],
	permLevel: 0
};

exports.help = {
	name: "leave",
	description: "Ngừng chơi nhạc",
	usage: "leave"
};