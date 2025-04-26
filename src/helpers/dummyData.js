const User = require("../models/user");

module.exports = async () => {
    const user = await User.findOne({username:"enes"});

    for (let i=31; i<40; i++){
        const book = {
            name:`Kitap ${i}`,
            writer: `Yazar ${i}`,
            pageCount: 120,
            status: "Okundu",
            link: `kitap-${i}`,
            startDate: "25.04.2025",
            endDate: "25.04.2025"
        };
        user.books.push(book);
    };
    await user.save();
};