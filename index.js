const TOKEN = process.env.TOKEN || "";
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, channel } = require('./config/bot');
const processCommand = require("./command");
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Search", { type: "LISTENING" });
    const generalChannel = client.channels.get(channel.general);
    generalChannel.send("Schedule bot ready!");
    const botImage = new Discord.Attachment("https://ih1.redbubble.net/image.582237006.5163/flat,1000x1000,075,f.u1.jpg");
    generalChannel.send(botImage)
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }

    if (receivedMessage.content.startsWith(prefix)) {
        processCommand(receivedMessage)
    }
})

client.login(TOKEN);