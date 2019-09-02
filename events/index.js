module.exports = function(client) {
    return function(message) {
        const _event = client.events.get(message.author.id);
        if (client.eventers.has(_event.type)) {
            try {
                return client.eventers.get(_event.type).run(client, message, _event)
            }
            catch (e) {
                client.log(e.stack);
            }
        }
    }
};