const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1896,
        max: new Date().getYear() + 1900,
        required: true
    },
    format: {
        type: String,
        enum: ['VHS', 'DVD', 'Blu-Ray'],
        required: true
    },
    actors: { 
        type: [String],
        required: true
    }
});


module.exports = model('Movie', MovieSchema);