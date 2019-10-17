const User = require("../models/user");
const Account = require("../models/account");

const user = new User({displayName: "Trần Đức Cường", discordId: "123"});

(async function(){
    const a = await user.save();
    console.log(a)
})()