const path = require("path");
const alias = new Object({
    'ping': 'ping',
    'help': 'help',
    'reload': 'reload',
    'play': 'music/play',
    'login': 'schedule/login',
})
const commands = new Object();
// Object.keys(alias).forEach(function(key) {
//     const pathAlias = path.resolve(__dirname, `../commands/${alias[key]}.js`);
//     alias[key] = pathAlias;
//     commands[key] = require(pathAlias);
// })
for(key in alias){
    const pathAlias = path.resolve(__dirname, `../commands/${alias[key]}.js`);
    alias[key] = pathAlias;
    commands[key] = require(pathAlias);
}
module.exports = {
    alias,
    commands
}