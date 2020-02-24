const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require("./routes/router"));

app.use((err, req, res, next) => {
    let status = err.statusCode;
    if (err instanceof multer.MulterError) {
        status = 400;
    }
    status = status || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({ message, data });
  });

const PORT = config.get('port') || 5000;

async function startServer() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT);
    } catch (err) {
        process.exit(1);
    }
}

startServer();

module.exports = app;
