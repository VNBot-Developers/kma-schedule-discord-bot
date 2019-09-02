module.exports = function(client) {
    client.prefix = "!";
    client.defaultChannel = {
        general: "604721235959611406",
        schedule: "615476097554841600",
        test: "615926386103812116",
        music_voice: "615590985300312109",
    };
    client.owner = {
        id: "493716447428608001"
    }
    client.elevation = function(message) {
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
}