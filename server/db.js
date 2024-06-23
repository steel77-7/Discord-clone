const mongoose = require('mongoose');

const db = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(res=> console.log('Connection to the database established')).catch(error=>console.error(error))
}

module.exports = db;