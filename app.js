const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*',cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(morgan('tiny'));

app.use(errorHandler);

const api = "api";
console.log(api)

const userRoute = require('./routes/users');
const buyerRoute = require('./routes/buyers');
const sellerRoute = require('./routes/seller');

// Routes

app.use("/api/users", userRoute);
app.use("/api/buyer", buyerRoute);
app.use("/api/seller", sellerRoute);


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect( "mongodb+srv://user_name:pass_word@cluster0.p7zidkq.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
