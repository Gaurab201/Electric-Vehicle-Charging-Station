const router = require("express").Router();
const chager = require("../controller/chagerController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, chager.addChager);

module.exports = router;
