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