// IMPORT LIBRARY
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const csurf = require("csurf");

// IMPORT FILE
const config = require("./config/config");
const mongodb = require("./database/mongodb")();
const User = require("./models/user");
const auth = require("./routers/auth");
const user = require("./routers/user");
const locals = require("./middleware/locals");

// MIDDLEWARES
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: config.mongodb.mongodb_host,
        collectionName: "sessions"
    }),
    cookie: {
        maxAge: 1000*60*60*48
    }
}));
app.use((req,res,next)=>{
    if(req.session.isAuth){
        csurf()(req,res,next);
    }else{
        next();
    }
});

// PAGES
app.use(locals);
app.use(auth);
app.use(user);
app.use((req,res)=>{
    res.render("user/not-found");
});

// PORT
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Sunucu ${port} portunda dinleniyor.`);
});