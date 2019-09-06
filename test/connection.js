const mongoose = require("mongoose");
const DATABASE_STRING = process.env.DATABASE_STRING || "mongodb+srv://notekunn:6LK7xV8nxQmC@kmabot-rfffk.azure.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(DATABASE_STRING, { useNewUrlParser: true });

mongoose.connection
    .once('open', function() {
        console.log("Success")
    })
    .on('error', function(error) {
        console.log(error.stack)
    })