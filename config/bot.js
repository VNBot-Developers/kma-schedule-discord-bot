const { Collection } = require("discord.js");
function randomArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
module.exports = function(client) {
    client.prefix = ">";
    client.defaultChannel = {
        general: "604721235959611406",
        schedule: "615476097554841600",
        test: "615926386103812116",
        music: [
            "619378852111581185",
            "619378891311546380",
            "619379101937041408"
        ]
    };
    client.owner = {
        id: "493716447428608001"
    }
    client.elevation = function(message) {
        if (message.channel.type != "text") return 1;
        const roles = message.guild.roles;
        const memberRoles = message.member.roles;
        const adminRole = roles.find(({ name }) => name == "ADMINISTRATOR");
        if (adminRole && memberRoles.has(adminRole.id)) return 4;
        const devRole = roles.find(({ name }) => name == "DEVELOPER");
        if (devRole && memberRoles.has(devRole.id)) return 3;
        const modRole = roles.find(({ name }) => name == "MODERATOR");
        if (modRole && memberRoles.has(modRole.id)) return 2;
        const botRole = roles.find(({ name }) => name == "BOT");
        if (botRole && memberRoles.has(botRole.id)) return 1;
        return 0;
    }

    client.music = new Collection();

    client.random = randomArray;
    client.getEmoji = id => client.emojis.get(id).toString();
}