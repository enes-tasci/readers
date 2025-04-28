const User = require("../models/user");
const slugify = require("../helpers/slugfield");

exports.book_details_post = async (req,res) => {
    const username = req.session.username;
    const link = req.params.slug;
    const status = req.body.btn;

    if(status!="Okundu" && status!="Okunuyor" && status!="Yarıda Bırakıldı"){
        return res.send("Hata!");
    };
    
    const user = await User.findOne({username:username});
    const book = user.books.find(book => book.link == link);
    if(!book) return res.send("Kitap Bulunamadı.");
    
    book.status = status;
    book.endDate = "-"

    if(status=="Okundu"){
        book.endDate = new Date().toLocaleDateString("tr-TR");
    };
    await user.save();

    res.redirect(`/kitap-listesi`);
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
    
    res.render("book/book-details",{
        book: book
    });
};

exports.book_filter_get = async (req,res) => {
    const status = req.params.status;
    const username = req.session.username;
    const user = await User.findOne({username:username});
    let booksFilter;
    if(status=="okunanlar") booksFilter = user.books.filter(book => book.status=="Okundu");
    else if(status=="suan-okunanlar") booksFilter = user.books.filter(book => book.status=="Okunuyor");
    else if(status=="yarida-birakilanlar") booksFilter = user.books.filter(book => book.status=="Yarıda Bırakıldı");
    else return res.send("Hata!");

    const page = req.query.page || 0;
    if(page<0) return res.redirect("?page=0");
    const bookCount = booksFilter.length;

    const size = 10;
    const pageCount = Math.ceil(bookCount/size);
    const start = page*size;
    const end = start + size;

    const books = booksFilter.slice(start,end);

    res.render("book/book-list",{
        books:books,
        bookCount: bookCount,
        pageCount: pageCount,
        page: page
    });
};

exports.book_list_get = async (req,res) => {
    const username = req.session.username;
    const user = await User.findOne({username:username});

    const page = req.query.page || 0;
    if(page<0) return res.redirect("?page=0");
    
    const bookCount = user.books.length;

    const size = 10;
    const pageCount = Math.ceil(bookCount/size);
    const start = page*size;
    const end = start + size;

    const books = user.books.slice(start,end);

    res.render("book/book-list",{
        books:books,
        bookCount: bookCount,
        pageCount: pageCount,
        page: page
    });
};

exports.book_add_post = async (req,res) => {
    const username = req.session.username;
    const name = req.body.name.trim();
    const writer = req.body.writer.trim();
    const pageCount = req.body.pageCount.trim();
    const status = "Okunuyor";
    const link = slugify(name);

    if(name.length<3 || writer.length<3 || pageCount<3) return res.send("Hatalı bilgiler!");

    const book = {
        name: name,
        writer: writer,
        pageCount: pageCount,
        status: status,
        link: link,
    };

    const user = await User.findOne({username:username});
    user.books.push(book);
    await user.save();

    res.redirect("/kitap-listesi");
};

exports.book_add_get = (req,res) => {
    res.render("book/book-add");
};