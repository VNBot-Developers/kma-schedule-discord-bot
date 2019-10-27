const moment = require("moment-timezone");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { TIME_ZONE, TIME_FORMAT } = process.env;
const NotiSchema = new Schema({
    discordId: String,
    type: {
        type: String,
        enum: ['DAY', 'WEEK', 'MONTH'],
        default: 'WEEK'
    },
    options: {
        dayOfWeek: {
            type: Number,
            min: 0,
            max: 6
        },
        dayOfMonth: {
            type: Number,
            min: 1,
            max: 30
        },
        hour: {
            type: Number,
            min: 0,
            max: 23
        },
        minute: {
            type: Number,
            min: 0,
            max: 59
        }
    },
    nextTick: {
        type: Date,
        default: new Date()
    }

})
NotiSchema.methods.tick = function(){
    const noti = this;
    const current = moment().tz(TIME_ZONE).format("");
    current.second
}
const Notification = mongoose.model('notification', NotiSchema);

module.exports = Notification;