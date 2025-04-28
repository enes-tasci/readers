const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.profile_post = async (req,res) => {
    const username = req.session.username;
    const password = req.body.password.trim();
    const newPassword = req.body.newPassword.trim();
    const newPassword2 = req.body.newPassword2.trim();

    if(password==newPassword || password.length<9 || newPassword.length<9 ||
        newPassword2.length<9 || newPassword!=newPassword2
    ){
        res.cookie("text","Mevcut şifreniz yanlış.");
        res.cookie("color","alert-danger");
        return res.redirect("/profil");
    };

    const user = await User.findOne({username:username});
    
    const passwordCheck = await bcrypt.compare(password,user.password);
    
    if(!passwordCheck) {
        res.cookie("text","Mevcut şifreniz yanlış.");
        res.cookie("color","alert-danger");
        return res.redirect("/profil");
    };

    const hashPassword = await bcrypt.hashSync(newPassword,10);
    user.password = hashPassword;
    await user.save();
    res.cookie("text","Şifreniz değiştirildi.");
    res.cookie("color","alert-success");

    res.redirect("/profil");
};

exports.profile_get = async (req,res) => {
    const message = {text:req.cookies.text,color:req.cookies.color};
    res.clearCookie("text");
    res.clearCookie("color");

    const username = req.session.username;
    const user = await User.findOne({username:username});
    
    let bookRead = 0;
    let pageRead = 0;
    
    user.books.forEach(book => {
        if(book.status=="Okundu") {
            bookRead++;
            pageRead+=book.pageCount
        };
    });

    res.render("user/profile",{
        user: user,
        bookRead: bookRead,
        pageRead: pageRead,
        message:message
    });
};

exports.contact_get = async (req,res)=>{  
    res.render("user/contact");
};

exports.about_get = async (req,res)=>{
    res.render("user/about");
};

exports.home_get = async (req,res)=>{
    res.render("user/index");
};