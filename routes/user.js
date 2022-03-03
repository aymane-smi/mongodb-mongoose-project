const express  = require("express"),
      router   = express.Router({mergeParams: true}),
      {Create, Login, Edit, Delete} = require("../controllers/user");    
router.post("/new", Create);
router.post("/login", Login);
router.patch("/:id", Edit);
router.delete("/:id", Delete)

module.exports = router;