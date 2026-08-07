const express = require("express");

const router = express.Router();

const { createUser } = require("../controllers/dietController");

router.post("/user", createUser);

module.exports = router;