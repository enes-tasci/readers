const {mongoose,Schema} = require("mongoose");
const Book = require("../models/book");

const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    books: [Book]
},{timestamps: false});

module.exports = mongoose.model("User",User);;