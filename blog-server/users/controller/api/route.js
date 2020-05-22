const router = require("express").Router();
const { authenticate } = require("../../middleware/authenticate");

router.use("/auth", require("./auth/auth.route"));
router.use("/user", authenticate, require("./user/user.route"));

module.exports = router;
