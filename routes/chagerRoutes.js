const router = require("express").Router();
const chager = require("../controller/chagerController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, chager.addChager);

router.get("/:id", verifyTokenAndAuthorization, chager.getChagerById);

module.exports = router;
