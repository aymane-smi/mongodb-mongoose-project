const express  = require("express"),
      router   = express.Router({mergeParams: true}),
      {Create, ByUser, Find, Edit} = require("../controllers/project");

router.post("/new", Create);
router.post("/byUser/:id", ByUser);
router.post("/:id", Find)
router.patch("/:id/edit", Edit);

module.exports = router;