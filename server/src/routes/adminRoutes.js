const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/adminController");




router.post("/signup", AdminController.signup);
router.post("/login", AdminController.login);

router.get("/all", AdminController.all);



module.exports = router;
