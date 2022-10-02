const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

let connectionObj = mongoose.connection;
connectionObj.on('connected', () => console.log('Connected to Mongo DB'));
connectionObj.on('error', () => console.log("Unable to connect ot Mongo DB"));
