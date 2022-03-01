const project = require("../models/project");


exports.Create = async(req, res)=>{
    try{
        let projectObj = req.body;
        let newProject = new project(projectObj); //we can use create();
        if(!newProject)
            res.status(404).json({
                message: "can't create a project!"
            });
        newProject.save();
        res.status(200).json({
            message: "project created successfully!!",
            project: newProject
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};


exports.ByUser = async(req, res)=>{
    try{
        let {id} = req.params;
        project.findByUserId(id, (err, result)=>{
            if(!result)
                res.status(404).json({
                    message: "projects not found or id is not correct!"
                });
            res.status(200).json({
                message: "projects found!",
                result
            });
        }); 
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

exports.Find = async(req, res)=>{
    try{
        let {id} = req.params;
        let oldProject = await project.findById(id);
        if(!oldProject)
            res.status(404).json({
                message: "project not found!"
            });
        res.status(200).json({
            message: "project found!",
            oldProject
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}