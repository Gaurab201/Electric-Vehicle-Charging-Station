const express = require("express");
const router = express.Router();

const auth = require("../controllers/authControllers");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/login", auth.logout);


module.exports = router;