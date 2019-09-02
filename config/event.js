const { Collection } = require("discord.js");
const path = require('path');
const eventers = [{
    name: 'schedule:login',
    path: 'login'
},
];
module.exports = function(client) {
    client.events = new Collection();
    client.eventers = new Collection();
    eventers.forEach(function(eventer) {
        pathEventer = path.resolve(__dirname, `../events/${eventer.path}.js`);
        delete require.cache[pathEventer];
        client.eventers.set(eventer.name, require(pathEventer));
    })
}