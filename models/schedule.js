const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
    studentCode: String,
    day: Date,
    subjectCode: String,
    subjectName: String,
    className: String,
    teacher: String,
    lesson: String,
    room: String
})

const Schedule = mongoose.model('schedule', ScheduleSchema);

module.exports = Schedule;