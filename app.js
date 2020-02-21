const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use('/api', require("./routes/router"));

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
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
        app.listen(PORT, () => {
            console.log(`Port ${PORT} is listening...`)
        });
    } catch (err) {
        console.log("Connection failed", err);
        process.exit(1);
    }
}

startServer();
