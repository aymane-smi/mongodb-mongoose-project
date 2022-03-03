const { findById } = require("../models/user");
const user = require("../models/user"),
      jwt  = require("jsonwebtoken");

exports.Create = async(req, res)=>{
    let userObj = req.body;
    console.log(req.body);
    let newUser = await new user(userObj);
    newUser.save((err, user)=>{
        if(err){
            res.status(401).json({
                error: err.message
            });
        }else{
            res.status(200).json({
                message: "user created!",
                user
            });
        }
    });
};


exports.Login = async(req, res)=>{
    try{
        let userObj = req.body;
        let UserFetch = await user.findOne({email: userObj.email}, 'email _id username')
        if(!UserFetch)
            res.status(404).json({
                message: "email address doesn't exist!"
            });
        user.update({_id: userObj._id}, {$set : {lastLogin: Date.now()}}, ()=>{
            console.log("lastLogin updated!");
        });
        let token = jwt.sign({
            id: UserFetch._id,
            email: UserFetch.email,
            username: UserFetch.username
        }, process.env.SECRET_KEY);
        res.status(200).json({
            message: "user logged in!",
            user: {UserFetch, token}
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

exports.Edit = async(req, res)=>{
    try{
        let userObj = req.body;
        let UserFetch = await user.findOne({_id: req.params.id}, null);
        if(!UserFetch)
            res.status(404).json({
                message: "user not found!"
            });
        if(userObj.email)
            UserFetch.email = userObj.email;
        if(userObj.username)
            UserFetch.username = userObj.username;
        UserFetch.modifiedOn = Date.now();
        await UserFetch.save((err)=>{
            if(!err)
                console.log("saved!");
            else
                console.log("can't be saved!");
        });
        res.status(200).json({
            message: "user updated!",
            user: UserFetch
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};


exports.Delete = async(req, res)=>{
    try{
        const {id} = req.params;
        let currentUser = await user.findById(id);
        if(!currentUser)
            res.status(404).json({
                message: "user not found!"
            });
        //we can user directly findByIdAndRemove or to use .remove() to the instance 'currentUser'
        await currentUser.remove();
        res.status(200).json({
            message: "user deleted!",
            user: currentUser
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};