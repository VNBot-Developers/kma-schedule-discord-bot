module.exports = function (client) {
    return async function (message) {
        const _event = client.events.get(message.author.id);
        if (client.eventers.has(_event.type)) {
            try {
                const eventFunction = client.eventers.get(_event.type)
                const isAsync = eventFunction.run.constructor.name === "AsyncFunction";
                if (isAsync) return await eventFunction.run(client, message, _event);
                return eventFunction.run(client, message, _event)
            }
            catch (e) {
                message.channel.send(`Có lỗi xảy ra: ${e.message}`);
                client.log(e.stack);
            }
        }
    }
};