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
    date: {
        type: String,
        default: new Date().toLocaleDateString("tr-TR")
    }    
},{timestamps:false});

module.exports = Book