const mongoose     = require("mongoose"),
      projectSchema = new mongoose.Schema({
          projectName: String,
          createdOn: {
              type: Date,
              default: Date.now
          },
          modifiedOn: Date,
          createdBy: String,
          tasks: String
      });


projectSchema.statics.findByUserId = function(userId, callback){
    return this.find({createdBy: userId}, '_id createdOn projectName', {sort: 'modifiedOn'}, callback);
}


const project = mongoose.model("Project", projectSchema);
module.exports = project;