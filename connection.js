const mongoose = require("mongoose"),
      db       = 'mongodb://localhost/mongoose-book';

exports.connection = async ()=>{
    mongoose.connect(db, {useNewUrlParser: true,
        useUnifiedTopology: true});

    // await mongoose.connection.on("connected", ()=>{
    //     console.log("connected to:",db);
    //     return true;
    // });
    // mongoose.connection.on("error", ()=>{
    //     console.log("connection error");
    //     return false;
    // });
    // process.on("SIGINT", ()=>{
    //     mongoose.connection.close(()=>{
    //         console.log("disconncted through app terminator");
    //         process.exit(0);
    //     });
    // });
}