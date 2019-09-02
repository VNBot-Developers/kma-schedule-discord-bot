module.exports = function(client) {
    return function(message) {
        const _event = client.events.get(message.author.id);
         switch (_event.type) {
            case "schedule:login": {
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

            default:
                break;
        }
    }
};