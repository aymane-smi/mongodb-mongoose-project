const mongoose     = require("mongoose"),
      validator    = (val)=>{
          if(val.includes('@'))
            return true;
        return false;
      },
      userSchema   = new mongoose.Schema({
          username: String,
          email: {
              type: String,
              unique: true,
              validate : {validator, msg : "not an E-mail"}
          },
          createdOn: {
              type: Date,
              default: Date.now
          },
          modifiedOn: Date,
          lastLogin: Date
      });
const user = mongoose.model("User", userSchema);
module.exports = user;