const User = require("../models/user");
const getProp = require("lodash/get");
async function handler(client, message, studentCode, password) {
    // message.channel.send(`Bạn đăng nhập với tài khoản ${email} mật khẩu ${password}`);
    const user = await User.findOneOrCreate({ discordId: message.author.id }, { displayName: message.author.tag, avatarUrl: message.author.avatarURL });
    try {

        const { information } = await user.login(studentCode, password);
        message.channel.send(`Bạn đang đăng nhập với tài khoản sv: ${information.name}(${studentCode})`);
    } catch (error) {
        return Promise.reject(Error(getProp(error, 'error.error.message') || getProp(error, 'error.message') || 'Đăng nhập thất bại'))
    }

}
exports.run = async function (client, message, _event) {
    if (!_event.data.studentCode) {
        const studentCode = message.content;
        message.channel.send("Nhập password!")
            .then(function () {
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, { time: 10 * 1000, maxMatches: 1, errors: ['time'] })
                    .then(function (messages) {
                        const password = messages.first().content;
                        handler(client, message, studentCode, password)
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
        const studentCode = _event.data.studentCode;
        const password = message.content;
        client.events.delete(message.author.id);
        return await handler(client, message, studentCode, password);
    }

}