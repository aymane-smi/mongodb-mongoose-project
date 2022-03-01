const mongoose     = require("mongoose"),
      userSchema   = new mongoose.Schema({
          username: String,
          email: {
              type: String,
              unique: true
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