const path = require("path");
const { Collection } = require("discord.js")
const commands = [{
    name: 'ping',
    path: 'ping'
},
{
    name: 'help',
    path: 'help'
},
{
    name: 'reload',
    path: 'reload'
},
{
    name: 'play',
    path: 'music/play'
},
{
    name: 'leave',
    path: 'music/leave'
},
{
    name: 'login',
    path: 'schedule/login'
},
{
    name: 'download',
    path: 'schedule/download'
},
{
    name: 'search',
    path: 'schedule/search'
},
{
    name: 'notify',
    path: 'schedule/notify'
},
{
    name: 'test',
    path: 'test'
},
];
module.exports = function(client) {

    client.commands = new Collection();
    commands.forEach(function(command) {
        pathCommand = path.resolve(__dirname, `../commands/${command.path}.js`);
        delete require.cache[pathCommand];
        client.commands.set(command.name, require(pathCommand));
    })
}