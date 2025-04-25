// IMPORT LIBRARY
const bcrypt = require("bcryptjs");

// IMPORT FILES
const User = require("../models/user");

exports.logout = (req,res) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Bir hata oluştu.', err);
            return res.send("Bir hata oluştu.");
        }
        res.clearCookie('connect.sid');
        res.redirect('/giris-yap');
    });
};

exports.login_get = (req,res)=>{
    res.render("auth/login");
};

exports.login_post = async (req,res)=>{
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    if(username.length<3 || password.length<9) return res.send("Yanlış kullanıcı adı veya şifre.");
    
    const user = await User.findOne({username:username});
    if(!user) return res.send("Yanlış kullanıcı adı veya şifre.");

    const compPassword = await bcrypt.compare(password,user.password);
    if(!compPassword) return res.send("Yanlış kullanıcı adı veya şifre.");

    req.session.regenerate((err) => {
        if (err) {
            console.log("Oturum yenileme hatası:", err);
            return res.redirect("/giris-yap");
        };
        req.session.isAuth = true;
        req.session.username = username;
        req.session.name = user.name;

        res.redirect("/");
    });
};

exports.signup_get = (req,res)=>{
    res.render("auth/signup");
};

exports.signup_post = async (req,res)=>{
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const hashPassword = await bcrypt.hashSync(password,10);

    if(name.length<3 || username.length<3) return res.send("Değerler en az 3 karakter olmalıdır.");
    else if(password.length<9 || password2.length<9) return res.send("Parolanız en az 9 karakter olmalıdır.");
    else if(password==name || password==username) return res.send("Şifreniz isiminizden farklı olmalıdır.");
    else if(password!=password2) return res.send("Şifreler uyuşmuyor.");

    const user = await User.findOne({username:username}).select({username:1});
    if(user) return res.send("Bu kullanıcı adı kullanılıyor.");

    try{
        await User.create({
            name: name,
            username: username,
            password: hashPassword
        });
        res.redirect("/giris-yap");
    }catch(err){
        res.send("Kullanıcı oluşturulamadı.");
        res.redirect("/kayit-ol");
    };
};