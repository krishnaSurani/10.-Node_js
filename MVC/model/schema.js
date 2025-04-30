const mongoose = require("mongoose");

const schema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const firstSchema = mongoose.model("MVC-project", schema);

module.exports = firstSchema;
