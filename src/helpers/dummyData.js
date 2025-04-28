const User = require("../models/user");

module.exports = async () => {
    const user = await User.findOne({username:"enes"});

    for (let i=26; i<39; i++){
        const book = {
            name:`Kitap ${i}`,
            writer: `Yazar ${i}`,
            pageCount: 120,
            status: "Yarıda Bırakıldı",
            link: `kitap-${i}`,
            startDate: "22.04.2025",
            endDate: "-"
        };
        user.books.push(book);
    };
    await user.save();
};