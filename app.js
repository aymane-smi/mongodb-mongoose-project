require("dotenv").config({path: './.env'});
const express    = require("express"),
      RouteU     = require("./routes/user"),
      RouteP     = require("./routes/project"),
      app        = express(),
      {connection} = require("./connection"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      PORT       = process.env.PORT || 8081;


mongoose.connect('mongodb://localhost/mongoose-book', {useNewUrlParser: true,
        useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use("/api/user", RouteU);
app.use("/api/project", RouteP);

app.listen(PORT, ()=>{
    console.log(`listening to ${PORT}`);
});

// app.get('/user', user.index);
// app.post('/user/new', user.doCreate);
// app.post('/user/edit', user.doEdit);
// app.post('/user/delete', user.doDelete);
// app.post('/user/login', user.deLogin);
// app.get('/logout', user.logout);


// app.post('/project/new', project.doCreate);
// app.get('/project/:id', project.displayInfo);
// app.get('/project/edit/:id', project.edit);
// app.post('/project/edit/:id', project.doEdit);
// app.get('/project/delete/:id', project.confirmDelete);
// app.post('/project/delete/:id', project.doDelete);