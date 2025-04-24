const User = require("../models/user");

exports.profile_get = async (req,res) => {
    const username = req.session.username;

    const user = await User.findOne();
    
    res.render("user/profile",{
        user: user
    });
};

exports.home_get = (req,res)=>{
    res.render("user/index");
};