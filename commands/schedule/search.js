const moment = require("moment-timezone");
const User = require("../../models/user");
const { RichEmbed } = require("discord.js");
const { TIME_ZONE, TIME_FORMAT } = process.env;
const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});
const groupByDay = groupBy('day');
function sendSchedule(client, channel, schedules, user) {
    if (schedules.length == 0) return channel.send("Không có thời khóa biểu.");
    const timeTable = groupByDay(schedules);
    const embed = new RichEmbed();
    embed
        .setColor("#993a9e")
        .setFooter("Bot by Notekunn")
        .setThumbnail(client.user.avatarURL);
    embed.addField(`THỜI KHÓA BIỂU:`, `Sinh viên: ${user.name}, Mã sinh viên: ${user.studentCode}`, false);
    Object.keys(timeTable).forEach(dayString => {
        const day = moment(dayString).tz(TIME_ZONE);
        const msg = timeTable[dayString].map(e => `Tiết: ${e.lesson}\nMôn: ${e.className}\nGiáo viên: ${e.teacher}\nPhòng: ${e.room}`).join("\n\n");
        embed.addField(`:link: Thứ ${day.isoWeekday() + 1}, ngày ${day.format(TIME_FORMAT)}:`, msg, false);
    })
    channel.send(embed);
}
exports.run = async function(client, message, args) {
    const user = await User.findOneOrCreate({ discordId: message.author.id }, { displayName: message.author.tag });
    const isValidToken = await user.checkToken();
    if (!isValidToken) {
        message.channel.send(["Bạn chưa đăng nhập hoặc phiên đăng nhập hết hạn!", "Vui lòng đăng nhập lại!"]);
        return;
    }
    const [typeSearch] = args.splice(0, 1);
    const days = [];
    if (!typeSearch || !["day", "week"].includes(typeSearch)) days.push(moment.tz(TIME_ZONE).format(TIME_FORMAT));
    if (typeSearch == "day") {
        args.forEach(arg => {
            const day = moment(arg, TIME_FORMAT, TIME_ZONE);
            if (day.isValid()) days.push(day.format(TIME_FORMAT));
        })
        if (days.length == 0) days = [moment.tz(TIME_ZONE).format(TIME_FORMAT)];
    }
    if (typeSearch == "week") {
        let day = moment(args[0], TIME_FORMAT, TIME_ZONE);
        day = day.isValid() ? day : moment.tz(TIME_ZONE);
        for (let i = 0; i <= 6; i++) {
            days.push(day.day(i).format(TIME_FORMAT));
        }
    }
    client.log(`Search schedules: ${days}`);
    const { data: schedules } = await user.search(days);
    sendSchedule(client, message.channel, schedules, user.information);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    dmOnly: false,
    aliases: ['search'],
    permLevel: 0
};

exports.help = {
    name: "search",
    description: "Tra cứu thời khóa biểu",
    usage: "search (day/week) [day1(DD/MM/YYYY) day2 ...]"
};