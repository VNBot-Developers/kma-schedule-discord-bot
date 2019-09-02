const helpCommand = require("./help")
const { prefix } = require("../config/bot");
const path = require("path");
const { alias, commands } = require("../config/cmd");
module.exports = function(client, eventQueue) {
    return function(message) {
        const fullCommand = message.content.substr(prefix.length) // Remove the leading exclamation mark
        const splitCommand = fullCommand.split(/\s+/) // Split the message up in to pieces for each space
        const cmd = splitCommand[0].toLowerCase(); // The first word directly after the exclamation is the command
        const args = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

        console.log("Command: " + cmd);
        console.log("Arguments: " + args);
        if (!commands.hasOwnProperty(cmd)) return message.channel.send("Lệnh không hỗ trợ");
        const command = commands[cmd];
        switch (cmd) {
            case "help": return command.run(client, message, args, commands, prefix);
            case "reload": return command.run(client, message, args, alias, commands);
            case "login": return command.run(client, message, args, eventQueue);
            default: return command.run(client, message, args);
        }
    }
};