const router = require("express").Router();
const { auth } = require("../middlewares/auth.middleware");
const { admin,subAdmin } = require("../middlewares/role.middleware");


module.exports = router;