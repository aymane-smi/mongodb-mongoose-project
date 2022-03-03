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



exports.Edit = async(req, res)=>{
    try{
        let projectObj = req.body;
        let projectFetch = await project.findOne({_id: req.params.id}, null);
        if(!projectFetch)
            res.status(404).json({
                message: "project not found!"
            });
        if(projectObj.tasks)
            projectFetch.tasks = projectObj.tasks;
        if(projectObj.projectName)
            projectFetch.projectName = projectObj.projectName;
        projectFetch.modifiedOn = Date.now();
        await projectFetch.save((err)=>{
            if(!err)
                console.log("saved!");
            else
                console.log("can't be saved!");
        });
        res.status(200).json({
            message: "project updated!",
            project: projectFetch
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
        const currentProject = await project.findById(id);
        if(!currentProject)
            req.status(404).json({
                message: "project not found!"
            });
        await currentProject.remove();
        res.status(200).json({
            message: "project deleted!",
            project: currentProject
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};