const YTDL = require("ytdl-core");

exports.run = async function(client, message, args) {
    const musicChannels = client.defaultChannel.music;
    if (!client.music.has(message.guild.id)) {
        client.music.set(message.guild.id, {
            connection: undefined,
            isPlay: false,
            queue: []
        })
    }
    const data = client.music.get(message.guild.id);
    if (!data.connection) {
        const { voiceChannel } = await join(client, message, args);
        data.connection = await voiceChannel.join();        
        client.music.set(message.guild.id, data);
    }

    // if (data.queue.length == 0 && message.guild.me.voiceChannel) return message.channel.send("Xin lỗi, bot đã kết nối với một kênh âm thanh khác.");

    if (!args[0]) return message.channel.send("Xin lỗi, vui lòng nhập một url.");
    const validate = await YTDL.validateURL(args[0]);
    if (!validate) return message.channel.send("Xin lỗi, vui lòng nhập một url **hợp lệ**.");
  
    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    const info = await YTDL.getInfo(args[0]);

    if (data.queue.length > 0) {
        message.channel.send(`Add ${info.title} to playlist!`);
    }
    data.queue.push({
        title: info.title,
        author: message.author.tag,
        url: args[0],
        annouceChannel: message.channel
    })
    client.music.set(message.guild.id, data);
    if (!data.isPlay) play(client, message.guild.id);
}

async function finish(client, guildId) {
    const data = client.music.get(guildId);
    const nextPlay = data.queue.shift();
    data.isPlay = false;
    client.music.set(guildId, data);
    if (data.queue.length == 0) {
        const voiceChannel = client.guilds.get(guildId).me.voiceChannel;
        voiceChannel && voiceChannel.leave();
        client.music.delete(guildId);
        return nextPlay.annouceChannel.send("Playlist end!");
    }
    else {
        return await play(client, guildId);
    }
}
async function play(client, guildId) {
    const data = client.music.get(guildId);
    if (data.queue.length == 0) return;
    data.isPlay = true;
    client.music.set(guildId, data);
    const nextPlay = data.queue[0];
    const connection = data.connection;
    if (!connection) client.music.delete(guildId);
    const dispatcher = connection.playStream(YTDL(nextPlay.url, { filter: "audioonly" }))
    nextPlay.annouceChannel.send(`🎵 Đang phát: \`${nextPlay.title}\` | Người yêu cầu: ${nextPlay.author}`);
    dispatcher.on('end', function() {
        finish(client, guildId);
    });

    dispatcher.on('error', e => {
        // Catch any errors that may arise
        client.log(e.stack);
        data.isPlay = false;
        client.music.set(guildId, data);
    });
}

async function join(client, message, args) {
    // console.log(message.guild.channels.size);

    const musicChannels = client.defaultChannel.music;
    let memberVoiceChannel = message.member.voiceChannel || {};
    let botVoiceChannel = message.guild.me.voiceChannel || {};

    if (memberVoiceChannel.id == botVoiceChannel.id && musicChannels.includes(memberVoiceChannel.id)) return { voiceChannel: botVoiceChannel };

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
            return { voiceChannel: botVoiceChannel };
        } catch (e) {
            console.log(e.stack);
        }
    }
    if (permissions.has('CREATE_INSTANT_INVITE')) {
        try {
            const { code } = await botVoiceChannel.createInvite({}, "Nghe nhạc");
            message.channel.send(`Tham gia kênh sau để nghe nhạc: https://discord.gg/${code}`);
            return { voiceChannel: botVoiceChannel };
        } catch (e) {
            console.log(e.stack);
        }
    }
    message.channel.send(`Tham gia kênh ${voiceChannel.name} sau để nghe nhạc.`);
    return { voiceChannel: botVoiceChannel };
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    dmOnly: false,
    aliases: ['pl'],
    permLevel: 0
};

exports.help = {
    name: "play",
    description: "Chơi nhạc",
    usage: "play [link ytb]"
};