exports.run = function (client, message, args) {
    if (args.length > 0) {
        message.channel.send("It looks like you might need help with " + args);
    } else {
        message.channel.send("Đang cập nhật");
    }
}