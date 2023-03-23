const mongoose = require('mongoose');

const dbConnection = () =>{
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => console.log('Connected to DB'))
    .catch(err => console.log(err));
}

module.exports = dbConnection;