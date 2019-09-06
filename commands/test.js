const Discord = require('discord.js');

exports.run = async function(client, message, args) {
    // console.log(message.guild.channels.size);

    const musicChannels = client.defaultChannel.music;
    let memberVoiceChannel = message.member.voiceChannel || {};
    let botVoiceChannel = message.guild.me.voiceChannel || {};

    if (memberVoiceChannel.id == botVoiceChannel.id && musicChannels.includes(memberVoiceChannel.id)) return {voiceChannel: botVoiceChannel};

    const voiceChannel = message.guild.channels.get(client.random(musicChannels));
    const permissions = voiceChannel.permissionsFor(client.user);

    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send('Bot cần được cấp quyền `CONNECT` và `SPEAK` để có thể kết nối và phát nhạc!');
    }
    if (!musicChannels.includes(botVoiceChannel.id)) {

        try {
            await voiceChannel.join();
            botVoiceChannel = voiceChannel;
        } catch (e) {
            message.channel.send(`Có lỗi khi bot tham gia kênh thoại:\n${e.stack}`);
        }
    }
    if (memberVoiceChannel.id != botVoiceChannel.id && permissions.has('MOVE_MEMBERS')) {
        try {
            await message.member.setVoiceChannel(botVoiceChannel);
            return {voiceChannel: botVoiceChannel};
        } catch (e) {
            console.log(e.stack);
        }
    }
    if (permissions.has('CREATE_INSTANT_INVITE')) {
        try {
            const { code } = await botVoiceChannel.createInvite({}, "Nghe nhạc");
            message.channel.send(`Tham gia kênh sau để nghe nhạc: https://discord.gg/${code}`);
            return {voiceChannel: botVoiceChannel};
        } catch (e) {
            console.log(e.stack);
        }
    }
    message.channel.send(`Tham gia kênh ${voiceChannel.name} sau để nghe nhạc.`);
    return {voiceChannel: botVoiceChannel};
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