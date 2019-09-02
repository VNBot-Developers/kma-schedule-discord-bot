exports.run = function(client, message, _event) {
    if (!_event.data.email) {
        _event.data.email = message.content;
        message.channel.send("Nhập password!");
        client.events.set(message.author.id, _event);
        return;
    }
    if (!_event.data.password) {
        _event.data.password = message.content;
        message.channel.send(`${_event.data.email} - ${_event.data.password}`);
        message.delete();
        client.events.delete(message.author.id);
        return;
    }
}