const {mongoose,Schema} = require("mongoose");
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
    }
},{timestamps: false});

const userModel = mongoose.model("User",User);

module.exports = userModel;