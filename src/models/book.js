const {mongoose,Schema, mongo} = require("mongoose");

const Book = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
},{timestamps:false});

module.exports = Book