// Import packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;
const logger = require("morgan");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },() => {
	console.log("Mongodb connected successfully...");
});

// Middlewares
app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register Router
const registerApi = require('./routers/registerApi');

app.use('/api/register', registerApi);

// Run server
app.listen(port, () => console.log(`Server is running at port: ${port}`));
