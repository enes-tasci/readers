const User = require("../models/user");

exports.book_list_get = async (req,res) => {
    const username = req.session.username;

    const { books } = await User.findOne({username:username}).select({books:1});
    
    res.render("user/book-list",{
        books:books
    });
};

exports.book_add_post = async (req,res) => {
    const username = req.session.username;
    const name = req.body.name.trim();
    const writer = req.body.writer.trim();
    const pageCount = req.body.pageCount.trim();
    const comment = req.body.comment.trim();
    const status = req.body.status.trim();

    const book = {
        name: name,
        writer: writer,
        pageCount: pageCount,
        comment: comment,
        status: status
    };

    await User.updateOne(
        {username},
        {
            $push: {
                books: book
            }
        }
    );

    res.redirect("/profil");

};

exports.book_add_get = (req,res) => {
    res.render("user/book-add");
};

exports.profile_get = async (req,res) => {
    const username = req.session.username;
    const user = await User.findOne({username:username});
    
    res.render("user/profile",{
        user: user
    });
};

exports.home_get = async (req,res)=>{
    res.render("user/index");
};