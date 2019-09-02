module.exports = function(client) {
    return function(message) {
        const _event = client.events.get(message.author.id);
        if(client.eventers.has(_event.type)) return client.eventers.get(_event.type).run(client, message, _event)
    }
};