const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/UsersController")


router.get("/",UsersController.getAllUser)
router.get("/:id",UsersController.getUserById)
router.post("/signup",UsersController.SignUp)
router.post("/login",UsersController.login)

module.exports = router;