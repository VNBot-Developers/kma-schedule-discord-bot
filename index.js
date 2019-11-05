require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;
const Discord = require('discord.js');
const log = require("npmlog");
const client = new Discord.Client();
client.log = require("./config/log");
require("./config/command")(client);
require("./config/bot")(client);
require("./config/event")(client);
const processCommand = require("./commands")(client);
const processEvent = require("./events")(client);
const mongoose = require("mongoose");
const { DATABASE_STRING } = process.env;
mongoose.connect(DATABASE_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose.connection
    .once('open', function() {
        console.log("Connection database success!")
    })
    .on('error', function(error) {
        console.log(error.stack);
        process.exit(1);
    })
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
    client.log(message.toString())
    if (client.events.has(message.author.id)) return processEvent(message);
    if (message.content.startsWith(client.prefix)) return processCommand(message);

})

client.login(TOKEN)
    .then(function() {
        log.info('login', `Logged in as ${client.user.tag}!`);
    })
    .catch(function(e) {
        log.error('login', e.stack);
    })