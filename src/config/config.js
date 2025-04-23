module.exports = {
    mongodb: {
        mongodb_host: process.env.MONGODB
    },
    session: {
        secret: process.env.SESSION_SECRET
    }
};