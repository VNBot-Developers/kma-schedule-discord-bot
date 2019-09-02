function handler(client, message, email, password) {
    message.channel.send(`Bạn đăng nhập với tài khoản ${email} mật khẩu ${password}`);
}
exports.run = function(client, message, _event) {
    if (!_event.data.email) {
        const email = message.content;
        message.channel.send("Nhập password!")
            .then(function() {
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, { time: 10 * 1000, maxMatches: 1, errors: ['time'] })
                    .then(function(messages) {
                        const password = messages.first().content;
                        handler(client, message, email, password)
                    })
                    .catch(() => {
                        message.channel.send('Hết hạn nhập vui lòng đăng nhập lại!');
                    });
            })
            .catch((e) => {
                message.channel.send(e.stack);
            });
        client.events.delete(message.author.id);
        return;
    }
    if (!_event.data.password) {
        const email = _event.data.email;
        const password = message.content;
        handler(client, message, email, password)
        client.events.delete(message.author.id);
        return;
    }

}