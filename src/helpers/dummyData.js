const User = require("../models/user");

module.exports = async () => {
    const user = await User.findOne({username:"enes"});

    for (let i=35; i<45; i++){
        const book = {
            name:`Kitap ${i}`,
            writer: `Yazar ${i}`,
            pageCount: 120,
            status: "Yarıda Bırakıldı",
            link: `kitap-${i}`,
            startDate: "25.04.2025",
            endDate: "25.04.2025"
        };
        user.books.push(book);
    };
    await user.save();
};