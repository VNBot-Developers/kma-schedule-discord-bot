const moment  = require("moment-timezone");
const log = (msg) => {
  console.log(`[${moment().tz(process.env.TIME_ZONE).format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
};
module.exports = log;