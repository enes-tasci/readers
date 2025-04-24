const slugify = require("slugify");

module.exports = (text) => {
    return slugify(text, {
        replacement: '-', 
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'vi',
        trim: true
    });
};