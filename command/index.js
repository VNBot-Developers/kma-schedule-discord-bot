const helpCommand = require("./help")
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command: " + primaryCommand)
    console.log("Arguments: " + arguments)

    if (primaryCommand == "help") {
        return helpCommand(arguments, receivedMessage)
    }
    receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")

}

module.exports = processCommand;