const TOKEN = process.env.DISCORD_TOKEN || "";
const Discord = require('discord.js');
const log = require("npmlog");
const client = new Discord.Client();
const { prefix, channel } = require('./config/bot');
const processCommand = require("./command")(client);
client.on('ready', () => {
    log.info('login', `Ready!`);
    client.user.setActivity(`${client.channels.size} channels `, { type: "WATCHING" });
    // const generalChannel = client.channels.get(channel.general);
    // generalChannel.send("Schedule bot ready!");

    // const botImage = new Discord.Attachment("https://ih1.redbubble.net/image.582237006.5163/flat,1000x1000,075,f.u1.jpg");
    // generalChannel.send(botImage)
});

client.on('error', function (e) {
    log.error(e.stack);
})
client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
        processCommand(message);
    }
})

client.login(TOKEN)
    .then(function () {
        log.info('login', `Logged in as ${client.user.tag}!`);
    })
    .catch(function (e) {
        log.error('login', e.stack);
    })