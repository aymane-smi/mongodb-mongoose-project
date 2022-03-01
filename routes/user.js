const express  = require("express"),
      router   = express.Router({mergeParams: true}),
      {Create, Login} = require("../controllers/user");    
router.post("/new", Create);
router.post("/login", Login);

module.exports = router;