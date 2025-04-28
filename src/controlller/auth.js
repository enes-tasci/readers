// IMPORT LIBRARY
const bcrypt = require("bcryptjs");

// IMPORT FILES
const User = require("../models/user");

exports.logout = (req,res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Bir hata oluştu.', err);
            return res.send("Bir hata oluştu.");
        };
        res.clearCookie('connect.sid');
        res.redirect('/giris-yap');
    });
};

exports.login_get = (req,res)=>{
    const message = {text:req.cookies.text,color: req.cookies.color};
    res.clearCookie("text");
    res.clearCookie("color");

    res.render("auth/login",{message:message});
};

exports.login_post = async (req,res)=>{
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    if(username.length<3 || password.length<9) {
        res.cookie("text","Yanlış kullanıcı adı veya şifre.");
        res.cookie("color","alert-danger");
        return res.redirect("/giris-yap");
    };
    
    const user = await User.findOne({username:username});
    if(!user) {
        res.cookie("text","Yanlış kullanıcı adı veya şifre.");
        res.cookie("color","alert-danger");
        return res.redirect("/giris-yap");
    }

    const compPassword = await bcrypt.compare(password,user.password);
    if(!compPassword) {
        res.cookie("text","Yanlış kullanıcı adı veya şifre.");
        res.cookie("color","alert-danger");
        return res.redirect("/giris-yap");
    }

    req.session.regenerate((err) => {
        if (err) {
            console.log("Oturum yenileme hatası, ", err);
            res.cookie("text","Oturum yenileme hatası.");
            res.cookie("color","alert-danger");
            return res.redirect("/giris-yap");
        };
        req.session.isAuth = true;
        req.session.username = username;
        req.session.name = user.name;

        res.redirect("/");
    });
};

exports.signup_get = (req,res)=>{    
    const message = {text:req.cookies.text,color:req.cookies.color};
    const value = {name:req.cookies.name,username:req.cookies.username}
    res.clearCookie("text");
    res.clearCookie("color");
    res.clearCookie("name");
    res.clearCookie("username");

    res.render("auth/signup",{message: message,value:value});
};

exports.signup_post = async (req,res)=>{    
    const name = req.body.name.trim();
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const password2 = req.body.password2.trim();
    const hashPassword = await bcrypt.hashSync(password,10);

    if(name.length<3 || username.length<3) {
        res.cookie("text","Değerler en az 3 karakter olmalıdır");
        res.cookie("color","alert-danger");
        res.cookie("name",name);
        res.cookie("username",username);
        return res.redirect("/kayit-ol");
    }else if(password.length<9 || password2.length<9) {
        res.cookie("text","Parolanız en az 9 karakter olmalıdır.");
        res.cookie("color","alert-danger");
        res.cookie("name",name);
        res.cookie("username",username);
        return res.redirect("/kayit-ol");
    }else if(password==name || password==username) {
        res.cookie("text","Şifreniz isminizde farklı olmalıdır.");
        res.cookie("color","alert-danger");
        res.cookie("name",name);
        res.cookie("username",username);
        return res.redirect("/kayit-ol");
    }else if(password!=password2) {
        res.cookie("text","Şifreler uyuşmuyor");
        res.cookie("color","alert-danger");
        res.cookie("name",name);
        res.cookie("username",username);
        return res.redirect("/kayit-ol");
    };

    const user = await User.findOne({username:username}).select({username:1});
    if(user) {
        res.cookie("text","Bu kullanıcı adı kullanılıyor.");
        res.cookie("color","alert-danger");
        res.cookie("name",name);
        res.cookie("username",username);
        return res.redirect("/kayit-ol");
    };

    try{
        await User.create({
            name: name.toUpperCase(),
            username: username,
            password: hashPassword
        });
        res.cookie("text","Kayıt işlemi başarılı.");
        res.cookie("color","alert-success");
        res.redirect("/giris-yap");
    }catch(err){
        res.cookie("text","Kullanıcı oluşturulamadı.");
        res.cookie("color","alert-danger");
        return res.redirect("/kayit-ol");
    };
};