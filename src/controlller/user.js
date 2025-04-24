const User = require("../models/user");
const slugify = require("../helpers/slugfield");

exports.book_details_post = async (req,res) => {
    const username = req.session.username;
    const link = req.params.slug;
    const status = req.body.btn;

    await User.updateOne(
        { username, "books.link": link },
        { $set: { "books.$.status": status } }
    );
    
    res.redirect(`/kitap-listesi/${link}`);
};

exports.book_details_get = async (req,res) => {
    const username = req.session.username;
    const link = req.params.slug;
    const bookFind = await User.findOne(
        {username:username,"books.link":link},
        {"books.$":1, _id:0}
    );

    if(!bookFind) return res.send("Kitap bulunamadı.");

    const book = bookFind.books[0];
    
    res.render("user/book-details",{
        book: book
    });
};

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
    const status = req.body.status.trim();
    const link = slugify(name);

    const book = {
        name: name,
        writer: writer,
        pageCount: pageCount,
        status: status,
        link: link
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