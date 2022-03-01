const express  = require("express"),
      router   = express.Router({mergeParams: true}),
      {Create, ByUser, Find} = require("../controllers/project");

router.post("/new", Create);
router.post("/byUser/:id", ByUser);

router.post("/:id", Find)
module.exports = router;