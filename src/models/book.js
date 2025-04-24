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
    status: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        default: new Date().toLocaleDateString("tr-TR")
    },
    endDate: {
        type: String,
        default: "-"
    }
},{timestamps:false});

module.exports = Book