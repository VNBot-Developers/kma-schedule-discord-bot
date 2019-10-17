const User = require("../../models/user");
const { RichEmbed } = require("discord.js");
exports.run = async function(client, message, args) {
    const user = await User.findOneOrCreate({ discordId: message.author.id }, { displayName: message.author.tag });
    const { data } = await user.showSemester();
    const semesters = data.splice(0, 5);
    client.events.set(message.author.id, {
        type: 'schedule:download',
        data: {
            semesters
        }
    });
    const helpEmbed = new RichEmbed();
    helpEmbed
        .setColor("#993a9e")
        .setFooter("Bot by Notekunn");

    helpEmbed.addField("Chọn học kỳ:", semesters.map((e, i) => {
        const [a, b, c] = e.name.split("_");
        return `${i + 1} - Học kỳ ${a} ${b} - ${c}      `;
    }).join("\n"), true);
    message.channel.send(helpEmbed);

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    dmOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "download",
    description: "Tải thời khóa biểu",
    usage: "download [student code]"
};