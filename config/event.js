const { Collection } = require("discord.js")
module.exports = function(client) {
    client.events = new Collection();
}