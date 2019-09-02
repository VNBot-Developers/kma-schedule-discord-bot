const TOKEN = process.env.DISCORD_TOKEN || "";
const Discord = require('discord.js');
const log = require("npmlog");
const client = new Discord.Client();
client.log = require("./config/log");
require("./config/cmd")(client);
require("./config/bot")(client);
require("./config/event")(client);
const processCommand = require("./commands")(client);
client.on('ready', () => {
    log.info('login', `Ready!`);
    const activities = ['Triết học Mác Lê Nin', 'Toán cao cấp A1', 'Toán cao cấp A3', 'Tư tưởng Hồ Chí Minh'];
    setInterval(function() {
        const activitiy = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activitiy, { type: "WATCHING" });
    }, 10000)
    // const generalChannel = client.channels.get(channel.general);
    // generalChannel.send("Schedule bot ready!");

    // const botImage = new Discord.Attachment("https://ih1.redbubble.net/image.582237006.5163/flat,1000x1000,075,f.u1.jpg");
    // generalChannel.send(botImage)
});

client.on('error', function(e) {
    log.error(e.stack);
})
client.on('message', (message) => {
    // console.log(message.channel.id, client.user.id, message.author.id, message.channel.members);
    if (message.author.bot) return;
    client.log(message.content)
    if (client.events.has(message.author.id)) {
        let eventUser = client.events.get(message.author.id);
        switch (eventUser.type) {
            case "schedule:login": {
                if (!eventUser.data.email) {
                    eventUser.data.email = message.content;
                    message.channel.send("Nhập password!");
                    client.events.set(message.author.id, eventUser);
                    return;
                }
                if (!eventUser.data.password) {
                    eventUser.data.password = message.content;
                    message.channel.send(`${eventUser.data.email} - ${eventUser.data.password}`);
                    message.delete();
                    client.events.set(message.author.id, eventUser);
                    return;
                }

            }

            default:
                break;
        }

    }
    if (message.content.startsWith(client.prefix)) {
        return processCommand(message);
    }
})

client.login(TOKEN)
    .then(function() {
        log.info('login', `Logged in as ${client.user.tag}!`);
    })
    .catch(function(e) {
        log.error('login', e.stack);
    })