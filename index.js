const TOKEN = "NjA0NzIzODkxNTAzNjI4MzI4.XWOutg.23_-GBZ3eJX-14jBdUNddSsx8FU";
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, channel } = require('./config/bot');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Search", { type: "LISTENING" });
    //   const generalChannel = client.channels.get(channel.general);
    //   generalChannel.send("Schedule bot ready!");
    //   const botImage = new Discord.Attachment("https://ih1.redbubble.net/image.582237006.5163/flat,1000x1000,075,f.u1.jpg");
    //   generalChannel.send(botImage)
});

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }

    if (receivedMessage.content.startsWith(prefix)) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments)

    if (primaryCommand == "help") {
        return helpCommand(arguments, receivedMessage)
    }
    receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")

}
function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}


client.login(TOKEN);