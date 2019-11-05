module.exports = function(client) {
    return async function(message) {
        const fullCommand = message.content.substr(client.prefix.length) // Remove the leading exclamation mark
        const splitCommand = fullCommand.split(/\s+/) // Split the message up in to pieces for each space
        const cmd = splitCommand[0].toLowerCase(); // The first word directly after the exclamation is the command
        const args = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

        // console.log("Command: " + cmd);
        // console.log("Arguments: " + args);
        const command = client.commands.get(cmd) || client.commands.find(command => command.conf.aliases && command.conf.aliases.includes(cmd));
        if (!command) return message.channel.send("Lệnh không hỗ trợ!");
        if (!command.conf.enabled) return message.channel.send("Đang phát triển!");
        try {
            if (client.elevation(message) < command.conf.permLevel) return message.channel.send("Bạn không đủ quyền để thực hiện thao tác này");
            const channelType = message.channel.type;
            if (command.conf.guildOnly && channelType !== "text") return message.channel.send("Chỉ hỗ trợ trong `guild text channel`(Tin nhắn chung).");
            if (command.conf.dmOnly && channelType !== "dm") return message.channel.send("Chỉ hỗ trợ trong `dm text channel`(Tin nhắn riêng).");
            const isAsync = command.run.constructor.name === "AsyncFunction";
            if (isAsync) return await command.run(client, message, args);
            return command.run(client, message, args);
        }
        catch (e) {
            message.channel.send(`Có lỗi xảy ra: ${e.message}`);
            client.log(e.stack);
        }
    }
};