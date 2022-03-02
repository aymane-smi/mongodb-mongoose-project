const express  = require("express"),
      router   = express.Router({mergeParams: true}),
      {Create, Login, Edit} = require("../controllers/user");    
router.post("/new", Create);
router.post("/login", Login);
router.patch("/:id", Edit);

module.exports = router;