const mongoose = require("mongoose");


module.exports = function connectDB(url) {
    mongoose.set('strictQuery', true) 
    mongoose.connect(url)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err))
}