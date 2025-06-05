const express = require('express');

const router = express.Router();
const userController = require("../controller/users.js");


router.get("/", userController.getALLUsers);

router.post('/', userController.createNewUser);

module.exports = router;