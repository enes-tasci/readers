const mongoose = require("mongoose");

const User = require("../models/user");
const config = require("../config/config");

module.exports = async function (){
    try{
        await mongoose.connect(config.mongodb.mongodb_host);
        console.log("Veri tabanı bağlantısı sağlandı.");
    }catch(err){
        console.log("Veri tabanı bağlantısı sağlanamadı. ",err);
    };
};