exports.run = function(client, message, args, eventQueue) {
    const [email] = args;
    eventQueue.set(message.author.id, {
        type: 'schedule:login',
        data: {
            email,
            password: undefined,
        }
    });
   if(!email) message.channel.send("Nhập tài khoản");
   else message.channel.send("Nhập password!");
}